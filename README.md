# gulp-apply-style

Mail processor

## Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<!-- Nessesary. Will be searched in the stream. -->
	<link rel="stylesheet" href="main.css">
</head>
<body>
	
</body>
</html>
```

```js
gulp.src(['index.html', 'main.css'])
  .pipe(applyStyle(options))
  .pipe(gulp.dest('dist')); // index.html
```

## options

### options.processors

- 'width' strips `px` and adds as attribute
- 'height' the same
- 'align' adds as an attribute
- 'valign': the same
- 'bgcolor': the same
- 'background-color' adds as `bgcolor` attribute

### options.defaultAttribs
Type: `object || false`

- `table`
  - `border: 0`
  - `cellpadding: 0`
  - `cellspacing: 0`

### options.ext
Default: `.html`

Which files should be interpret as html

### options.clear

- `links: true`
- `classes: true`
- `ids: true`

