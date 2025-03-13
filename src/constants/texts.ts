export const PLACEHOLDER_SAMPLE_CODE = `Paste a list of new options in a CSV-like format:

title,1                 -> | title                 | 1 |
title with whitespace,2 -> | title with whitespace | 2 |
title , with , commas,3 -> | title , with , commas | 3 |
title with &quot;quotes&quot;,4   -> | title with &quot;quotes&quot;   | 4 |`;

export const ERROR_MESSAGE = `Please add at least 2 valid options.\n\nAn option is considered valid if its title is not empty and its weight is greater than 0.`;
