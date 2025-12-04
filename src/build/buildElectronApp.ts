import { copyFile, mkdir, rmdir } from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';
import { build } from 'esbuild';

const sourcePath = path.join(cwd(), 'src');
const inputPath = path.join(cwd(), 'electron-build');
const outputPath = path.join(cwd(), 'dist');

export const buildElectronApp = async (): Promise<void> => {
        if (await rmdir(outputPath, { recursive: true }).catch(() => false)) {
        console.log(`Cleaned existing output directory at ${outputPath}`);
    }
    await mkdir(outputPath, { recursive: true });

    await build({
        entryPoints: [path.join(sourcePath, "app", 'index.ts')],
        external: ['electron', 'express'],
        bundle: true,
        platform: 'node',
        outfile: path.join(outputPath, "app", 'index.js'),
    })

    await copyFile(
        path.join(sourcePath, 'app', 'index.html'),
        path.join(outputPath, 'app', 'index.html')
    );

    // See https://github.com/electron-userland/electron-builder/issues/7093 & https://github.com/electron-userland/electron-builder/issues/3179
    process.env.USE_HARD_LINKS = 'false';

    try {
        const { build, createTargets, Platform } = await import('electron-builder');
        await build({
            config: {
                npmRebuild: false,
            },
            targets: createTargets([Platform.WINDOWS, Platform.LINUX]),
            projectDir: inputPath,
        });
    } catch (error) {
        console.error(`Error while building the application:`, error);
        throw error;
    }
};

void buildElectronApp();