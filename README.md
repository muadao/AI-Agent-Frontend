# AI Agent Frontend

This project is a minimal example of an AI Agent that features 3D avatar interaction, responsive UI, and voice inputs / outputs. The frontend service is designed to be used with the AI Agent Backend Service.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Customize
### Use any GLTF file
This project uses the `GLTF` format for the avatar. You can use any GLTF file by replacing the `avatar.glb` file in the `public/models` directory.

However, there are some requirements if animations are meant to be used:
1. Make sure the animations' names match the code.

    Clip names are used only in `3d.ts`, and are triggered by events. 
2. Vertex animations are not supported.

If your GLTF file causes issues, it's very likely that comment out the codes in `3d.ts` that are related to animations will fix the issue.
### Replace icons and Images
Some icons are inlined svg, and some are images. Images can be replaced in the `public/assets` directory.