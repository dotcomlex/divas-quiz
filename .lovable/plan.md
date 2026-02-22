

## Replace Service Tile Images

You uploaded 4 new lash photos. I'll copy them into the project, replacing the existing service images:

| Image | Service | Replaces |
|---|---|---|
| Image 1 (natural lashes) | Set Clasico | `src/assets/services/clasico.jpg` |
| Image 2 (fuller lashes) | Set Hibrido | `src/assets/services/hybrid.jpg` |
| Image 3 (dramatic lashes) | Set de Volumen | `src/assets/services/volumen.jpg` |
| Image 4 (mega dramatic, both eyes) | Mega Volumen | `src/assets/services/mega.jpg` |

### Technical Details

- Copy each uploaded image to the corresponding path in `src/assets/services/`, overwriting the existing files
- The file extensions will change from `.jpg` to `.png`, so the import statements in `Quiz.tsx` (lines 7-10) need to be updated accordingly
- No other code changes needed -- the imports already wire these into the SERVICES array

### Files Changed

| File | What |
|---|---|
| `src/assets/services/clasico.png` | New image (replaces .jpg) |
| `src/assets/services/hybrid.png` | New image (replaces .jpg) |
| `src/assets/services/volumen.png` | New image (replaces .jpg) |
| `src/assets/services/mega.png` | New image (replaces .jpg) |
| `src/pages/Quiz.tsx` | Update 4 import paths from `.jpg` to `.png` |

