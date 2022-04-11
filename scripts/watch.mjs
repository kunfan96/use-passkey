import { exec } from 'child_process';
import esbuild from 'esbuild';

const tsconfig = `${process.cwd()}/tsconfig.json`;

export const external = ['vue', 'react', 'react-dom'];

const watch = (type = 'esm') =>
    esbuild
        .build({
            entryPoints: ['src/index.ts'],
            bundle: true,
            outfile: `dist/index.${type}.js`,
            loader: {
                '.ts': 'ts',
            },
            format: type,
            color: true,
            tsconfig,
            external,
            watch: {
                onRebuild: (err) => {
                    console.log('rebuilding....');
                    // refresh *.d.ts
                    if (!err) exec(`tsc -p ${tsconfig} --emitDeclarationOnly`);
                },
            },
        })
        .then(() => {
            console.log('watching...');
        })
        .catch(() => process.exit(1));

export default watch;
