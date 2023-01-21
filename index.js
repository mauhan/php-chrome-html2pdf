/**
 * This file is part of the spiritix/php-chrome-html2pdf package.
 *
 * @copyright Copyright (c) Matthias Isler <mi@matthias-isler.ch>
 * @license   MIT
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import getStdin from 'get-stdin';
import { program } from 'commander';
import Converter from './lib/Converter.js';

(async () => {
    program
        .option('-o, --options [options]', 'PDF options for puppeteer')
        .option('-po, --puppeteer-options <items>', 'Puppeteer options')
        .parse()
    const options = JSON.parse(program.opts().options);
    const puppeteerOptions = JSON.parse(program.opts().puppeteerOptions);

    const converter = new Converter(await getStdin(), options, puppeteerOptions);
    const buffer = await converter.run();

    process.stdout.write(buffer.toString('binary'), 'binary');
})();
