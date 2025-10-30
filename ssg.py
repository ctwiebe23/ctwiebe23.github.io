"""
FILE: ssg.py
AUTH: C Wiebe <ctwiebe23@gmail.com>
DESC: Simple SSG that generates my personal website using kera.
"""

from pathlib import Path
import shutil
import sys

import kera  # From package kera.
import yaml  # From package PyYAML.

# Return codes.
RETCODE_OK = 0
RETCODE_NO_LAYOUT = 1
RETCODE_NO_SRC = 2
RETCODE_OUTPUT_DIR_IS_FILE = 3
RETCODE_NO_DATA = 4
RETCODE_NAMING_CONFLICT = 5

CHAR_ENCODING = "utf-8"
CONTENT_SLOT = "##CONTENTS##"

if __name__ == "__main__":
    # Confirm the locations of required files.
    layout_path = Path("./layout.html")
    if not layout_path.is_file():
        print(f"ERROR : {layout_path} is not a file")
        sys.exit(RETCODE_NO_LAYOUT)

    src_dir_path = Path("./src")
    if not src_dir_path.is_dir():
        print(f"ERROR : {src_dir_path} is not a directory")
        sys.exit(RETCODE_NO_SRC)

    data_path = Path("./data.yaml")
    if not data_path.is_file():
        print(f"ERROR : {data_path} is not a file")
        sys.exit(RETCODE_NO_DATA)

    output_dir_path = Path("./www")
    if output_dir_path.is_file():
        print(f"ERROR : {output_dir_path} is a file, not a directory")
        sys.exit(RETCODE_OUTPUT_DIR_IS_FILE)
    if not output_dir_path.is_dir():
        output_dir_path.mkdir()

    # Read in the layout and data.
    layout = layout_path.read_text(encoding=CHAR_ENCODING)
    data = data_path.read_text(encoding=CHAR_ENCODING)
    data = yaml.safe_load(data)

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
                # Recursively operate on the inner directory.
                copy_dir_and_process_html(path, dest_path)

            else:  # Handling a file.
                if path.match("*.html"):
                    contents = path.read_text(encoding=CHAR_ENCODING)
                    page = layout.replace(CONTENT_SLOT, contents)
                    dest_path.write_text(page, encoding=CHAR_ENCODING)
                elif path.match("*.plate"):
                    dest_path = dest_path.with_suffix("")  # Remove .plate
                    contents = path.read_text(encoding=CHAR_ENCODING)
                    generated = kera.process(contents, data)
                    if dest_path.match("*.html"):
                        generated = layout.replace(CONTENT_SLOT, generated)
                    dest_path.write_text(generated, encoding=CHAR_ENCODING)
                else:
                    shutil.copy(str(path), str(dest_path))

    copy_dir_and_process_html(src_dir_path, output_dir_path)
    sys.exit(RETCODE_OK)
