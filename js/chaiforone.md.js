/*!
 * Chai ForOne keybaord v1.0
 * https://caixnet.github.io
 * Copyright (c) Cai guangxian
 * Author: Daway.Cai guangxian
 * Email: caixnet@outlook.com
 * Application number: 2014800745031
 * International Application : PCT/CN2014/092045, 
 * International Publication : WO2016/082081
 * Date: 2018-01-02
 */
/*! *****************************************************************************
Copyright (c) Daway.Cai . All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
// chai forone MarkDown Editor for triacode
// include ``chai character display``
// include %% chai character display %%
triaMD = {
    // forone render
    chaiHTMLzone: "chaiHTMLzone",
    chaiHTMLlabel: "chaiHTMLlabel",
    chaiHTMLtext: "chaiHTMLtext",
    chaiMDzone: "chaiMDzone",
    chaiMDlabel: "chaiMDlabel",
    chaiMDtext: "chaiMDtext",
    md: null,
    idHTMLzone: null,
    idHTMLtext: null,
    idMDzone: null,
    idMDtext: null,
    idMDdoc: null,
    //idIFRMfile: null,
    oldHTML: "",
    newHTML: "",
    oldMD: "",
    newMD: "",
    // get line
    getLine: function (str) {
        return str.split(forone.re.line).length
    },

    reverse: function (str) {
        return str.split("").reverse().join("");
    },
    //
    textHTML: function () {
        return forone.triaMD.idHTMLtext.value;
    },
    htmlDiv: function (str) {
        'use strict';
        logc(str, "htmlEncode");
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        str = div.innerHTML;
        div = undefined;
        return str;
    },
    codeBlocks: {},

    //
    // #h1 ##h2 ###h3 ####h4 #####h5 ######h6
    mdHeadLine: function (str) {
        var count = 0;
        var cai = null;
        forone.re.headline = /^(\#{1,6})([^\#\n]+)$/m;
        while ((forone.triaMD.md = forone.re.headline.exec(str)) !== null) {
            count = forone.triaMD.md[1].length;
            cai = forone.triaMD.md[2].trim();
            str = str.replace(forone.triaMD.md[0],
                '<h' + count + '>' + cai + '</h' + count + '>').trim();
        }
        return str;
    },

    // %abc%
    // ``abc``
    mdChai: function (str) {
        var cai;
        forone.re.chai = /%%\n?([^%%]+)%%/m;
        while ((forone.triaMD.md = forone.re.chai.exec(str)) !== null) {
            cai = forone.triaMD.md[1];
            str = str.replace(forone.triaMD.md[0],
                '<span class="chai">' + cai + '</span>').trim();
        }
        forone.re.chai = /``[^\(]\n?([^\``]+)``/m;
        while ((forone.triaMD.md = forone.re.chai.exec(str)) !== null) {
            cai = forone.triaMD.md[1];
            str = str.replace(forone.triaMD.md[0],
                '<span class="chai">' + cai + '</span>').trim();
        }
        return str;
    },
    // ``abc``
    mdCodeLine: function (str) {
        var cai;
        forone.re.chai = /`\n?([^`]+)`/m;
        while ((forone.triaMD.md = forone.re.chai.exec(str)) !== null) {
            cai = forone.triaMD.md[1];
            str = str.replace(forone.triaMD.md[0],
                '<code>' + cai + '</code>').trim();
        }
        return str;
    },
    // 
    // > abc
    mdBlockquote: function (str) {
        var repStr = [];
        var repTag = '####';
        var resTag = '>';
        //var reTag = new RegExp(repTag, "g");

        // before save old
        var reservedTag = '####';
        forone.re.bolditalic = /^[\s\t\n\f]*(([>]{1,3}))(.*)/gm;

        while ((forone.triaMD.md = forone.re.bolditalic.exec(str)) !== null) {
            repStr = [];
            switch (forone.triaMD.md[1].length) {
                case 1:
                    repStr = ['<blockquote><em> ', ' </em></blockquote>'];
                    break;
                case 2:
                    repStr = ['<blockquote><strong> ', ' </strong></blockquote>'];
                    break;
                case 3:
                    repStr = ['<blockquote> ', ' </blockquote>'];
                    break;
            }
            str = str.replace(forone.triaMD.md[0],
                '{  ' + encodeURIComponent(repStr[0] + forone.triaMD.md[3] + repStr[1]) + '  }');
        }

        forone.re.bolditalic = /({  )([^}]+)(  })/m;
        while ((forone.triaMD.md = forone.re.bolditalic.exec(str)) !== null) {
            str = str.replace(forone.triaMD.md[0], decodeURIComponent(forone.triaMD.md[2]));

        }
        return str;
    },
    mdSub: function (str) {
        var repStr = [];
        var repTag = '####';
        var resTag = '</';
        forone.re.bolditalic = /(?:([\/]{1,3}))([^\/\n\.]*[^\/\s])\1/g;
        while ((forone.triaMD.md = forone.re.bolditalic.exec(str)) !== null) {
            repeatStr = [];
            switch (forone.triaMD.md[1].length) {
                case 1:
                    repStr = ['<sub><em>', '</em></sub>'];
                    break;
                case 2:
                    repStr = ['<sub><strong>', '</strong></sub>'];
                    break;
                case 3:
                    repStr = ['<sub>', '</sub>'];
                    break;
            }
            str = str.replace(forone.triaMD.md[0],

                '{  ' + encodeURIComponent(repStr[0] + forone.triaMD.md[2] + repStr[1]) + '  }');

        }
        // forone.re.bolditalic = /(\<sub\>.*sub\>)/g;
        forone.logc(str);
        forone.re.bolditalic = /({  )([^}]+)(  })/m;
        while ((forone.triaMD.md = forone.re.bolditalic.exec(str)) !== null) {
            str = str.replace(forone.triaMD.md[0], decodeURIComponent(forone.triaMD.md[2]));
            // str = str.replace(forone.triaMD.md[0], repStr[0] + forone.triaMD.md[1] + repStr[1]);

        }

        return str;
    },

    // A\y\
    mdSup: function (str) {
        var repStr = [];

        forone.re.bolditalic = /(?:([\\]{1,3}))([^\\\n\.]*[^\\\s])\1/g;
        while ((forone.triaMD.md = forone.re.bolditalic.exec(str)) !== null) {
            repeatStr = [];

            switch (forone.triaMD.md[1].length) {
                case 1:
                    repStr = ['<sup><em>', '</em></sup>'];
                    break;
                case 2:
                    repStr = ['<sup><strong>', '</strong></sup>'];
                    break;
                case 3:
                    repStr = ['<sup>', '/sup>'];
                    break;
            }
            str = str.replace(forone.triaMD.md[0],
                repStr[0] + forone.triaMD.md[2] + repStr[1]);

        }
        return str;
    },

    // A\y\
    /// _abc_ __abc__ ___abc___
    mdInsert: function (str) {
        var repStr = [];

        forone.re.bolditalic = /(?:([_]{1,3}))([^_\n]+[^_\s])\1/gm;
        while ((forone.triaMD.md = forone.re.bolditalic.exec(str)) !== null) {
            repeatStr = [];
            //forone.logc(str,'TEST');
            //if (forone.triaMD.md[1] === '_') {
            switch (forone.triaMD.md[1].length) {
                case 1:
                    repStr = ['<ins><em>', '</em></ins>'];
                    break;
                case 2:
                    repStr = ['<ins><strong>', '</strong></ins>'];
                    break;
                case 3:
                    repStr = ['<ins>', '</ins>'];
                    break;
            }
            str = str.replace(forone.triaMD.md[0],
                repStr[0] + forone.triaMD.md[2] + repStr[1]);
        }
        return str;
    },
    /// ~abc~ ~~abc~~ ~~~abc~~~
    mdDelete: function (str) {
        var repStr = [];
        forone.re.bolditalic = /(?:([~]{1,3}))([^~\n]+[^~\s])\1/gm;
        while ((forone.triaMD.md = forone.re.bolditalic.exec(str)) !== null) {
            repeatStr = [];
            switch (forone.triaMD.md[1].length) {
                case 1:
                    repStr = ['<del><em>', '</em></del>'];
                    break;
                case 2:
                    repStr = ['<del><strong>', '</strong></del>'];
                    break;
                case 3:
                    repStr = ['<del>', '</del>'];
                    break;
            }
            str = str.replace(forone.triaMD.md[0],
                repStr[0] + forone.triaMD.md[2] + repStr[1]);
        }
        return str;
    },
    /// @abc@ @@abc@@ @@@abc@@@
    mdFontSize: function (str) {
        var repStr = [];
        forone.re.bolditalic = /(?:([@]{1,5}))([^@\n]+[^@\s])\1/gm;
        var mFontSize = 3;
        while ((forone.triaMD.md = forone.re.bolditalic.exec(str)) !== null) {
            repeatStr = [];
            mFontSize = 3 + forone.triaMD.md[1].length;
            repStr = ['<font="' + mFontSize + '">', '</font>'];
            str = str.replace(forone.triaMD.md[0],
                repStr[0] + forone.triaMD.md[2] + repStr[1]);
        }
        return str;
    },
    /// *abc* **abc** ***abc***
    mdStrong: function (str) {
        var repStr = [];
        forone.re.bolditalic = /(?:([\*]{1,3}))([^\*\n]+[^\*\s])\1/gm;
        while ((forone.triaMD.md = forone.re.bolditalic.exec(str)) !== null) {
            repeatStr = [];

            switch (forone.triaMD.md[1].length) {
                case 1:
                    repStr = ['<em>', '</em>'];
                    break;
                case 2:
                    repStr = ['<strong>', '</strong>'];
                    break;
                case 3:
                    repStr = ['<em><strong>', '</strong></em>'];
                    break;
            }
            str = str.replace(forone.triaMD.md[0],
                repStr[0] + forone.triaMD.md[2] + repStr[1]);

        }
        return str;
    },

    mdList: function (str) {

        var deepCount, regexInline, deepStatus = 0,
            status, repstr = "", items, indentItems, indent = false;
        forone.re.lists = /^((\s*((\+|\*|\-)|\d(\.|\))) [^\n]+)\n)+/gm;
        while ((forone.triaMD.md = forone.re.lists.exec(str)) !== null) {
            //logc(forone.triaMD.md, "lists");
            deepCount = 0;
            if ((forone.triaMD.md[0].trim().substr(0, 1) === '*') ||
                (forone.triaMD.md[0].trim().substr(0, 1) === '-') ||
                (forone.triaMD.md[0].trim().substr(0, 1) === '+')) {
                repstr = '<ul>';
            } else {
                repstr = '<ol>';
            }
            items = forone.triaMD.md[0].split('\n');
            indentItems = [];
            status = 0;
            indent = false;
            for (i = 0; i < items.length; i++) {
                if ((regexInline = /^((\s*)((\+|\*|\-|[0-9]*)|\d(\.|\))) ([^\n]+))/.exec(items[i])) !== null) {
                    if ((regexInline[2] === undefined) ||
                        (regexInline[2].length === 0)) {
                        deepStatus = 0;
                    } else {
                        if (indent === false) {
                            indent = regexInline[2].replace(/\t/, '    ').length;
                        }
                        deepStatus = Math.round(regexInline[2].replace(/\t/, '    ').length / indent);
                    }
                    while (status > deepStatus) {
                        repstr += indentItems.pop();
                        status--;
                        deepCount--;
                    }
                    while (status < deepStatus) {
                        if ((regexInline[0].trim().substr(0, 1) === '*') ||
                            (regexInline[0].trim().substr(0, 1) === '-') ||
                            (regexInline[0].trim().substr(0, 1) === '+')) {
                            repstr += '<ul>';
                            indentItems.push('</ul>');
                        } else {
                            repstr += '<ol>';
                            indentItems.push('</ol>');
                        }
                        status++;
                        deepCount++;
                    }
                    repstr += '<li>' + regexInline[6] + '</li>' + '\n';
                }
            }
            while (deepCount > 0) {
                repstr += '</ul>';
                deepCount--;
            }
            if ((forone.triaMD.md[0].trim().substr(0, 1) === '*') ||
                (forone.triaMD.md[0].trim().substr(0, 1) === '-') ||
                (forone.triaMD.md[0].trim().substr(0, 1) === '+')) {
                repstr += '</ul>';
            } else {
                repstr += '</ol>';
            }
            str = str.replace(forone.triaMD.md[0], repstr + '\n');
        }
        return str;
    },
    // /- \[[x|X]?\].*/gm
    // - [ ] 
    // todo-list
    mdTodoList: function (str) {
        var deepCount, regexInline, deepStatus = 0,
            status, repstr = "", items, indentItems, indent = false;

        forone.re.lists = /(-\s?\[([xX\s]?)\]\s*)(.*)\n/gm;
        while ((forone.triaMD.md = forone.re.lists.exec(str)) !== null) {

            deepCount = 0;
            if (forone.triaMD.md[2].toUpperCase() === 'X') {
                repstr = '<input type="checkbox" name="ToDoName" value="1" checked >' + forone.triaMD.md[3] + '<br />';
            } else {
                repstr = '<input type="checkbox" name="ToDoName" value="1" >' + forone.triaMD.md[3] + '<br />';
            }

            str = str.replace(forone.triaMD.md[0], repstr + '\n');
        }
        return str;
    },
    //
    //         this | *left* | center   | right
    // -----|:-------|:--------:|------:
    // with | sample | content  | for
    // lorem| ipsum  | dolor    | sit

    mdTable: function (str) {
        /* tables */
        var deepCount, regexInline, deepStatus = 0, tdAlign, cel,
            status, repstr = "", items, indentItems, indent = false, strict = false;
        forone.re.tables = /\n(([^|\n]+ *\| *)+([^|\n]+\n))((:?\-+:?\|)+(:?\-+:?)*\n)((([^|\n]+ *\| *)+([^|\n]+)\n)+)/g;
        while ((forone.triaMD.md = forone.re.tables.exec(str)) !== null) {
            repstr = '<table><tr>';
            helper = forone.triaMD.md[1].split('|');
            tdAlign = forone.triaMD.md[4].split('|');
            for (i = 0; i < helper.length; i++) {
                if (tdAlign.length <= i) {
                    tdAlign.push(0);
                } else if ((tdAlign[i].trimRight().slice(-1) === ':') && (strict !== true)) {
                    if (tdAlign[i][0] === ':') {
                        tdAlign[i] = 3;
                    } else {
                        tdAlign[i] = 2;
                    }
                } else if (strict !== true) {
                    if (tdAlign[i][0] === ':') {
                        tdAlign[i] = 1;
                    } else {
                        tdAlign[i] = 0;
                    }
                } else {
                    tdAlign[i] = 0;
                }
            }
            cel = ['<th>', '<th align="left">', '<th align="right">', '<th align="center">'];
            for (i = 0; i < helper.length; i++) {
                repstr += cel[tdAlign[i]] + helper[i].trim() + '</th>';
            }
            repstr += '</tr>';
            cel = ['<td>', '<td align="left">', '<td align="right">', '<td align="center">'];
            helper1 = forone.triaMD.md[7].split('\n');
            for (i = 0; i < helper1.length; i++) {
                helper2 = helper1[i].split('|');
                if (helper2[0].length !== 0) {
                    while (tdAlign.length < helper2.length) {
                        tdAlign.push(0);
                    }
                    repstr += '<tr>';
                    for (j = 0; j < helper2.length; j++) {
                        repstr += cel[tdAlign[j]] + helper2[j].trim() + '</td>';
                    }
                    repstr += '</tr>' + '\n';
                }
            }
            repstr += '</table>';
            str = str.replace(forone.triaMD.md[0], repstr);
        }
        return str;

    },
    mdTables: function mdTables(str) {
        // /(\|(?:[^\r\n\|]+\|)+)(?:\r?\n|\r)\|(?:[-—]+\|)+((?:(?:\r?\n|\r)(?:\|(?:[^\n\r\|]+\|)+))+)/
        var tcode = new RegExp(/(\|(?:[^\r\n\|]+\|)+)(?:\r?\n|\r)\|(?:[-—]+\|)+((?:(?:\r?\n|\r)(?:\|(?:[^\n\r\|]+\|)+))+)/, 'gu'), curT = 1;
        while (curT !== null) {
            curT = tcode.exec(str);
            if (curT !== null) {
                console.log(curT[2].split(/\r?\n|\r/));
                var rows = curT[2].split(/\r?\n|\r/).filter(function (a) { return a.length === 0 ? false : true; }), rowtrs = '<table><thead><tr><td>' + curT[1].split('|').slice(1, -1).join('</td><td>') + '</td></tr></thead><tbody>';
                console.log(rows);
                for (var i in rows) {
                    rowtrs += '<tr><td>' + rows[i].split('|').slice(1, -1).join("</td><td>") + '</td></tr>';
                }
                rowtrs += '</tbody></table>';
                str = str.replace(curT[0], rowtrs);
            }
        };
    },
    // [selfCSS](http://selfcss.org/)
    mdLink: function (str) {
        while ((stra = forone.re.links.exec(str)) !== null) {
            if (stra[0].substr(0, 1) === '!') {
                str = str.replace(stra[0], '<img src="' + stra[2] + '" alt="' + stra[1] + '" title="' + stra[1] + '" />');
            } else {
                str = str.replace(stra[0], '<a ' + 'href="' + stra[2] + '">' + stra[1] + '</a>');
            }
        }
        return str;
    },
    //
    mdRefLink: function (str) {
        while ((stra = forone.re.reflinks.exec(str)) !== null) {

        }
    },
    ///
    mdTriaCode: function (str) {
        var kor, korcon;
        forone.re.hr = /^(?:([\*\-_] ?)+)\1\1$/gm;
        forone.re.chai = /``(\(([a-z])*\))\n?([^``]+)``/g;
        while ((forone.triaMD.md = forone.re.chai.exec(str)) !== null) {

            kor = forone.triaMD.md[2];
            korcon = forone.triaMD.md[3];

        }
        forone.logc("lang:" + kor + " ，content: " + korcon, "Chia");
        return str;
    },
    // mail: /<(([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,7}))>/gmi,
    // <address@example.com>
    mdMail: function (str) {
        var stra;
        while ((stra = forone.re.mail.exec(str)) !== null) {

            str = str.replace(stra[0], '<a href="mailto:' + stra[1] + '">' + stra[1] + '</a>');
        }
        return str;
    },
    // <http://www.bing.com>
    mdURL: function (str) {
        while ((stra = forone.re.url.exec(str)) !== null) {
            //logc(stra, "http://");
            repstr = stra[1];
            if (repstr.indexOf('://') === -1) {
                repstr = 'http://' + repstr;
            }
            str = str.replace(stra[0],
                '<a ' + 'href="' + repstr + '">' + repstr.replace(/(https:\/\/|http:\/\/|mailto:|ftp:\/\/)/gmi, '') + '</a>');
        }
        return str;
    },
    //
    mdHr: function (str) {
        /* horizontal line */
        forone.re.hr = /^(?:([\*\-_] ?)+)\1\1$/gm;
        while ((stra = forone.re.hr.exec(str)) !== null) {

            str = str.replace(stra[0], '\n<hr />\n');
        }
        return str;
    },
    // code: /\s\`\`\`\n?([^`]+)\`\`\`/g,
    mdEnCodeBlock: function (str) {
        /* code */
        var mCode;
        forone.re.code = /\s\`\`\`\n?([^`]+)\`\`\`/g;
        while ((forone.triaMD.md = forone.re.code.exec(str)) !== null) {

            str = str.replace(forone.triaMD.md[0], '{begin1CodeBlock} ' +
                encodeURIComponent(forone.triaMD.md[1]) +
                ' {end2CodeBlock}').trim();

        }
        return str;
    },
    mdDeCodeBlock: function (str) {
        //str = decodeURIComponent(str)
        forone.re.code = /((\{begin1CodeBlock\})(.*)(\{end2CodeBlock}))/gm;
        forone.re.code = /(\{begin1CodeBlock\}(.*)\{end2CodeBlock})/gm;
        while ((forone.triaMD.md = forone.re.code.exec(str)) !== null) {
            str = str.replace(forone.triaMD.md[0], '<pre><code>' +
                decodeURIComponent(forone.triaMD.md[2]) +
                '</code></pre>').trim();

        }
        return str;
    },
    mdNewLine: function (str) {

        forone.re.code = / {2,}[\n]{1,}/gmi;
        while ((forone.triaMD.md = forone.re.code.exec(str)) !== null) {
            str = str.replace(forone.triaMD.md[0], ' <br /> ').trim();

        }


        return str;
    },
    mdEscapeHTML: function (str) {
        forone.re.code = /&/g;
        while ((forone.triaMD.md = forone.re.code.exec(str)) !== null) {
            str.replace(forone.triaMD.md[0], "&amp;");
        }
        forone.re.code = /</g;
        while ((forone.triaMD.md = forone.re.code.exec(str)) !== null) {
            str.replace(forone.triaMD.md[0], "&lt;");
        }
        forone.re.code = />/g;
        while ((forone.triaMD.md = forone.re.code.exec(str)) !== null) {
            str.replace(forone.triaMD.md[0], "&gt;");
        }
        forone.re.code = /"/g;
        while ((forone.triaMD.md = forone.re.code.exec(str)) !== null) {
            str.replace(forone.triaMD.md[0], "&quot;");
        }
        forone.re.code = /'/g;
        while ((forone.triaMD.md = forone.re.code.exec(str)) !== null) {
            str.replace(forone.triaMD.md[0], "&#39;");
        }
        return str;
    },
    //
    processMarkDown: function () {

        var str = forone.triaMD.newHTML;
        //  'use strict';
        forone.logc(str, "parse");
        var line, nstatus = 0,
            status, cel, tdAlign, ;
        var md = null; // md = stra
        var stra = null;
        var trashgc = [],
            deepCount = 0,
            i = 0,
            j = 0,
            crc32str = '';
        str = '\n' + str + '\n';


        str = forone.triaMD.mdEnCodeBlock(str);
        str = forone.triaMD.mdSub(str);
        str = forone.triaMD.mdBlockquote(str);
        str = forone.triaMD.mdTodoList(str);
        str = forone.triaMD.mdList(str);
        str = forone.triaMD.mdHeadLine(str);
        str = forone.triaMD.mdSup(str);
        str = forone.triaMD.mdInsert(str);
        str = forone.triaMD.mdDelete(str);
        str = forone.triaMD.mdStrong(str);
        str = forone.triaMD.mdFontSize(str);
        str = forone.triaMD.mdTable(str);
        str = forone.triaMD.mdLink(str);
        str = forone.triaMD.mdMail(str);
        str = forone.triaMD.mdURL(str);
        str = forone.triaMD.mdChai(str);
        str = forone.triaMD.mdTriaCode(str);
        str = forone.triaMD.mdCodeLine(str);
        str = forone.triaMD.mdNewLine(str);
        //str = forone.triaMD.mdEscapeHTML(str);
        str = forone.triaMD.mdHr(str);
        str = forone.triaMD.mdDeCodeBlock(str);
        //
        forone.triaMD.newHTML = str;
        forone.logc(str, 'MDprocess');
        return str;
        // }, 


    },
    markDown: function () {
        try {
            forone.triaMD.newHTML = forone.triaMD.textHTML();
            forone.triaMD.processMarkDown();
            forone.triaMD.idMDtext.innerHTML = forone.triaMD.newHTML;
            forone.logc('Markdown', 'Markdown');

        } catch (error) {
            //               forone.findResource();
            forone.logc(error, "try");
        }



    },
    //
    initMarkDown: function () {

        try {
            forone.isMarkDown = forone.getId(forone.triaMD.chaiHTMLtext) ? true : false;
            if (forone.isMarkDown) {
                // forone.include("demo2.js");
                forone.triaMD.idHTMLzone = forone.getId(forone.triaMD.chaiHTMLzone);
                forone.triaMD.idHTMLtext = forone.getId(forone.triaMD.chaiHTMLtext);

                forone.triaMD.idMDzone = forone.getId(forone.triaMD.chaiMDzone);
                forone.triaMD.idMDtext = forone.getId(forone.triaMD.chaiMDtext);

            }
        } catch (error) { forone.logc(error); }
    }
}