.PHONY=update-npm-libraries

update-npm-libraries:
	npx npm-check-updates -u
	npm i