import esbuild from 'esbuild';
import { exec } from 'child_process';
import { external } from './watch.mjs';

const tsconfig = `${process.cwd()}/tsconfig.json`;

const build = (type = 'esm') =>
    esbuild
        .build({
            entryPoints: ['src/index.ts'],
            bundle: true,
            outfile: `dist/index.${type}.js`,
            loader: {
                '.ts': 'ts',
            },
            external,
            format: type,
            color: true,
            tsconfig,
        })
        .then(() => {
            // refresh *.d.ts
            exec(`tsc -p ${tsconfig} --emitDeclarationOnly`);
        })
        .catch(() => process.exit(1));

export default build;
