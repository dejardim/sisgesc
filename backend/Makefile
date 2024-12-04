.PHONY: clean format lint test typecheck precommit review

clean:
	find . -type d -name "__pycache__" -exec rm -r {} +
	find . -type d -name "*.egg-info" -exec rm -r {} +
	find . -type d -name ".pytest_cache" -exec rm -r {} +
	find . -type d -name ".mypy_cache" -exec rm -r {} +

test:
	pytest -q --tb=short --disable-warnings

format:
	black .

lint:
	flake8 .

typecheck:
	mypy app tests

precommit:
	make format lint typecheck

review:
	make format lint typecheck test
