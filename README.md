C WIEBE'S HOMEPAGE                                                v2.1.0 260320
===============================================================================

A static site built by a custom SSG and served by Github Pages.  Website
written in raw HTML and CSS, SSG written in Python.

NAME
===============================================================================

cwiebe.com — C's personal homepage

SYNOPSIS
===============================================================================

    https://cwiebe.com
    https://cwiebe.com/about
    https://cwiebe.com/projects
    https://cwiebe.com/resources

DESCRIPTION
===============================================================================

IMPLEMENTATION
-------------------------------------------------------------------------------

The site itself is written in HTML and CSS.

The SSG is written in Python.  It makes use of the
[PyYAML](https://pypi.org/project/PyYAML/) library to parse YAML, and uses my
own [Kera](https://pypi.org/project/kera/) library to fill HTML templates.

DESIGN BRAINSTORMING
-------------------------------------------------------------------------------

* Light mode should be simple black-and-white, very close to the default CSS
  styles.  I really like <https://ksadov.com>, but don't think I can go that
  minimalist for this.
* Dark mode should be based on the
  [Kanagawa](https://github.com/rebelot/kanagawa.nvim) Neovim theme.
* Single-column site (primarily) centered on the page, not full-screen.
* Explore using a single non-scrolling background image — very experimental.
* Try using colored backgrounds like <https://keepachangelog.com> does.
* Experiment with a [REAPER](https://reaper.fm)-like header.
* Try to incorporate a sidebar similar to <https://yetiodo.com/>.

FONTS
-------------------------------------------------------------------------------

    Header: Clother
      Body: Koh Santepheap
      Else: Parabolica

SEE ALSO
===============================================================================

Site inspirations:

* <https://ksadov.com/>
* <https://nicbarker.com/clay>
* <https://practicaltypography.com/>
* <https://reaper.fm/>
* <https://keepachangelog.com>
* <https://g2games.dev/>
* <https://yetiodo.com/>
