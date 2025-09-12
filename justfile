# Runs the SSG script to build the site
build:
	python3 ./ssg.py

# Runs the build script anytime a file in ./src changes
watch:
	watchexec -i ./www -- just build

# Removes the ./www directory
clean:
	[ ! -d ./www ] || rm -r ./www
	[ ! -d ./__pycache__ ] || rm -r ./__pycache__

# starts a python server in ./www on 0.0.0.0:3040
serve:
	[ -d ./www ] && python3 -m http.server 3040 -d ./www
