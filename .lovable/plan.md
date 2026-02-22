

## Replace All 5 Service Images

You uploaded 5 official lash photos. Here's the mapping:

| Image | Service | File path |
|---|---|---|
| Image 1 (natural classic lashes) | Set Clasico | `src/assets/services/clasico.webp` |
| Image 2 (fuller hybrid lashes) | Set Hibrido | `src/assets/services/hybrid.webp` |
| Image 3 (dramatic volume lashes) | Set de Volumen | `src/assets/services/volumen.webp` |
| Image 4 (mega volume lashes) | Mega Volumen | `src/assets/services/mega.webp` |
| Image 5 (lifted natural lashes) | Lash Lift | `src/assets/services/lashlift.webp` |

### Technical Details

- Copy each uploaded image to `src/assets/services/` as `.webp` files
- Update all 5 import statements in `Quiz.tsx` to use the new `.webp` extensions (currently 4 are `.png` and 1 is `.jpg`)

### Files Changed

| File | What |
|---|---|
| `src/assets/services/clasico.webp` | New image |
| `src/assets/services/hybrid.webp` | New image |
| `src/assets/services/volumen.webp` | New image |
| `src/assets/services/mega.webp` | New image |
| `src/assets/services/lashlift.webp` | New image |
| `src/pages/Quiz.tsx` | Update 5 import paths to `.webp` |

