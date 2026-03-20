"""!
@package    ssg
@author     C Wiebe <ctwiebe23@gmail.com>
@date       Mar 12 2026
@brief      Simple SSG that generates a website using kera.
"""

from pathlib import Path

import argparse
import html
import shutil
import sys
import json

import yaml
import kera

# return codes
RETCODE_OK = 0
RETCODE_NO_LAYOUT = 1
RETCODE_NO_SRC = 2
RETCODE_OUTPUT_DIR_IS_FILE = 3
RETCODE_NO_DATA = 4
RETCODE_NAMING_CONFLICT = 5

# path defaults
DEFAULT_LAYOUT_PATH = "./layout.html"
DEFAULT_SRC_PATH = "./src"
DEFAULT_DATA_PATH = "./data.json"
DEFAULT_WWW_PATH = "./www"

# general constants
ENCODING = "utf-8"
CONTENT_STRING = "##CONTENTS##"
TITLE_STRING = "##TITLE##"


def get_args():
    "Builds the argument parser and retrieves the command line arguments."
    parser = argparse.ArgumentParser(
        prog="ssg",
        description="A simple python SSG",
        epilog="C Wiebe 2026",
    )

    parser.add_argument(
        "-l",
        "--layout",
        default=DEFAULT_LAYOUT_PATH,
        type=str,
        help="Path to the layout file",
    )

    parser.add_argument(
        "-c",
        "--content-string",
        type=str,
        default=CONTENT_STRING,
        help="The string in the layout file that should be replaced with page content",
    )

    parser.add_argument(
        "-t",
        "--title-string",
        type=str,
        default=TITLE_STRING,
        help="The string in the layout file that should be replaced with the page title",
    )

    parser.add_argument(
        "-s",
        "--src",
        default=DEFAULT_SRC_PATH,
        type=str,
        help="Path to the source directory",
    )

    parser.add_argument(
        "-d",
        "--data",
        default=DEFAULT_DATA_PATH,
        type=str,
        help="Path to the data file",
    )

    parser.add_argument(
        "-w",
        "--www",
        default=DEFAULT_WWW_PATH,
        type=str,
        help="Path to the output directory",
    )

    parser.add_argument(
        "-a",
        "--auto-index",
        action="store_true",
        default=False,
        help="Auto-generate directory listings in index-less directories",
    )

    args = parser.parse_args()
    return args


def confirm_file_locations(args):
    """
    Confirms all files are where they should be, creating them if needed and
    possible.
    """
    layout_path = Path(args.layout)
    if not layout_path.is_file():
        print(f"ERROR : {layout_path} is not a file")
        sys.exit(RETCODE_NO_LAYOUT)

    src_dir_path = Path(args.src)
    if not src_dir_path.is_dir():
        print(f"ERROR : {src_dir_path} is not a directory")
        sys.exit(RETCODE_NO_SRC)

    data_path = Path(args.data)
    if not data_path.is_file():
        print(f"ERROR : {data_path} is not a file")
        sys.exit(RETCODE_NO_DATA)

    output_dir_path = Path(args.www)
    if output_dir_path.is_file():
        print(f"ERROR : {output_dir_path} is a file, not a directory")
        sys.exit(RETCODE_OUTPUT_DIR_IS_FILE)
    if not output_dir_path.is_dir():
        output_dir_path.mkdir()

    return layout_path, src_dir_path, data_path, output_dir_path


def get_file_values(layout_path, data_path):
    layout = layout_path.read_text(encoding=ENCODING)
    data = data_path.read_text(encoding=ENCODING)

    if data_path.suffix in (".yaml", ".yml"):
        data = yaml.safe_load(data)
    else:
        data = json.loads(data)

    return layout, data


def main():
    args = get_args()
    layout_path, src_dir_path, data_path, output_dir_path = confirm_file_locations(args)

    layout, data = get_file_values(layout_path, data_path)
    
    def fill_page(content, title):
        titled = layout.replace(args.title_string, title)
        filled = titled.replace(args.content_string, content)
        return filled

    def create_index_page_for(dir: Path, dest_dir: Path):
        """
        If the given dir does not have an index page, this function creates one
        at dest_dir that lists the contents of dir.  Otherwise, it does
        nothing.
        """
        if not dir.is_dir():
            print(f"ERROR : directory does not exist: {dir}")
            return
        if not dest_dir.is_dir():
            print(f"ERROR : directory does not exist: {dest_dir}")
            return
        if (dir / "index.html").is_file():
            # index is already present, no need to act
            return

        dir_name = html.escape(dir.name)
        dest_path = dest_dir / "index.html"
        snippet = (
            f'<h2>Index of <code>{dir_name}</code></h2><section><dl class="dirlist">'
            + "<dt>DIR</dt>"
            + '<dd><a href=".." target="_self"><code>..</code></a></dd>'
        )

        for path in sorted(dir.iterdir(), key=str):
            ext = path.suffix[1:].upper() or "TXT" if path.is_file() else "DIR"
            ext = html.escape(ext)
            path_name = html.escape(path.name)
            target = "_blank" if path.is_file() else "_self"
            snippet += (
                f"<dt>{ext}</dt>"
                + f'<dd><a href="./{path_name}" target="{target}">'
                + f'<code>{path_name if path.is_file() else (path_name + "/")}</code>'
                + "</a></dd>"
            )

        snippet += "</dl></section>"
        page = fill_page(snippet, "Index of " + dir_name)
        dest_path.write_text(page, encoding=ENCODING)

    def copy_dir_and_process_html(dir_path: Path, dest_dir_path: Path):
        """
        Copies the contents of the directory at dir_path into the directory at
        dest_dir_path.  Inserts every HTML file it encounters into the layout
        before copying.
        """
        for path in dir_path.iterdir():
            dest_path = dest_dir_path / path.name

            if path.is_dir():
                if dest_path.is_file():
                    print(f"ERROR : naming conflict: {dest_path}")
                    sys.exit(RETCODE_NAMING_CONFLICT)
                    
                if not dest_path.is_dir():
                    dest_path.mkdir()
                    
                if args.auto_index:
                    # create index page if none is present
                    create_index_page_for(path, dest_path)
                    
                # recursively operate on the inner directory
                copy_dir_and_process_html(path, dest_path)
            else:  # handling a file
                page_title = path.name.split(".")[0]
                print(page_title)
                if page_title == "index":
                  if dir_path == src_dir_path:  # root page
                    page_title = "Home"
                  else:  # take name of parent directory
                    page_title = dir_path.stem
                    
                page_title = html.escape(page_title).capitalize()
                
                if path.match("*.html"):
                    contents = path.read_text(encoding=ENCODING)
                    page = fill_page(contents, page_title)
                    dest_path.write_text(page, encoding=ENCODING)
                elif path.match("*.plate"):
                    dest_path = dest_path.with_suffix("")  # remove .plate suffix
                    contents = path.read_text(encoding=ENCODING)
                    generated = kera.process(contents, data)
                    if dest_path.match("*.html"):
                        generated = fill_page(generated, page_title)
                    dest_path.write_text(generated, encoding=ENCODING)
                else:
                    shutil.copy(str(path), str(dest_path))

    copy_dir_and_process_html(src_dir_path, output_dir_path)
    sys.exit(RETCODE_OK)


if __name__ == "__main__":
    main()
