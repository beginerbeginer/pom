# Configuration

## Settings

pom-vscode provides the following settings, configurable via VS Code's Settings UI or `settings.json`.

### `pom.preview.defaultZoom`

Default zoom level for the preview panel.

| Value | Description            |
| ----- | ---------------------- |
| `fit` | Fit to width (default) |
| `50`  | 50%                    |
| `75`  | 75%                    |
| `100` | 100%                   |
| `150` | 150%                   |

Example in `settings.json`:

```json
{
  "pom.preview.defaultZoom": "100"
}
```

## Troubleshooting

### Preview does not open

- Make sure the file has a `.pom.md` or `.pom.xml` extension.
- Check that the extension is installed and enabled in VS Code.

### Preview shows an error

- Check the pom XML syntax in the file. The preview panel displays error messages when the XML is invalid.
- For `.pom.md` files, ensure that `pomxml` code fences contain valid pom XML.

### Preview does not update

- The preview updates automatically when the file is saved or edited. If it does not update, try closing and reopening the preview panel.
