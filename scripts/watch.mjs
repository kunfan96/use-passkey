import { exec } from 'child_process';
import esbuild from 'esbuild';

const tsconfig = `${process.cwd()}/tsconfig.json`;

const watch = (type = 'esm') =>
    esbuild
        .build({
            entryPoints: ['lib/index.ts'],
            bundle: true,
            outfile: `dist/index.${type}.js`,
            loader: {
                '.ts': 'ts',
            },
            format: type,
            color: true,
            tsconfig,
            watch: {
                onRebuild: (err) => {
                    // refresh *.d.ts
                    if (!err) exec(`tsc -p ${tsconfig} --emitDeclarationOnly`);
                },
            },
        })
        .catch(() => process.exit(1));

export default watch;
