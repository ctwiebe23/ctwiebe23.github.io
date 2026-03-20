# Runs the SSG script to build the site
build:
	./.venv/bin/python3 ./ssg.py -d ./data.yaml

# Runs the build script anytime a file changes (ignoring ./www)
watch:
	watchexec -i ./www -- just build

# Removes the ./www and ./__pycache__ directories
clean:
	[ ! -d ./www ] || rm -r ./www
	[ ! -d ./__pycache__ ] || rm -r ./__pycache__
	[ ! -d ./.mypy_cache ] || rm -r ./.mypy_cache
	[ ! -d ./.venv ] || rm -rf ./.venv

venv:
	[ -d ./.venv ] || python3 -m venv .venv

install: clean venv
	./.venv/bin/pip3 install -r ./REQUIREMENTS.txt

# starts a python server in ./www on 0.0.0.0:3040
serve:
	[ -d ./www ] && python3 -m http.server 3040 -d ./www
