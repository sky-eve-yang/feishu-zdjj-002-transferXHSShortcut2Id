"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['replit.app']);
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            'zh-CN': {
                'shortcut': '短链接',
                'noteId': '笔记 Id',
                'longLink': '长链接',
                'placeholderShortcut': '请选择小红书短链接对应字段',
            },
            'en-US': {
                'shortcut': 'Short Link',
                'noteId': 'Note ID',
                'longLink': 'Long Link',
                'placeholderShortcut': 'Please select the corresponding field for Xiaohongshu Short Link',
            },
            'ja-JP': {
                'shortcut': 'ショートリンク',
                'noteId': 'ノート ID',
                'longLink': 'ロングリンク',
                'placeholderShortcut': '小红書のショートリンクに対応するフィールドを選択してください',
            },
        }
    },
    // 定义捷径的入参
    formItems: [
        {
            key: 'shortcut',
            label: t('shortcut'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                placeholder: t('placeholderShortcut'),
                supportType: [block_basekit_server_api_1.FieldType.Url, block_basekit_server_api_1.FieldType.Text],
            },
            validator: {
                required: true,
            }
        },
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Object,
        extra: {
            icon: {
                light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/abjayvoz/ljhwZthlaukjlkulzlp/2024q3/telephone.svg?x-resource-account=public',
            },
            properties: [
                {
                    key: 'id',
                    isGroupByKey: true,
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: 'id',
                    hidden: true,
                },
                {
                    key: 'noteId',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('noteId'),
                    primary: true
                },
                {
                    key: 'longLink',
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('longLink')
                }
            ],
        },
    },
    execute: async (formItemParams, context) => {
        const { shortcut = [] } = formItemParams;
        let shortcut_string = shortcut[0]?.link;
        // console.log("shortcut_string", shortcut_string, typeof shortcut, shortcut)
        if (!shortcut_string) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
                msg: '短链接不能为空',
            };
        }
        if (!/^http:\/\/xhslink.com\//.test(shortcut_string)) {
            console.log(shortcut_string);
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
                msg: '短链接格式不正确',
            };
        }
        try {
            const res = await context.fetch(`https://feishu-field-short-transfer-xhs-shortcut-2-id-wuyi.replit.app/transfer_shortcut2id?shortcut=${shortcut_string}`, {
                method: 'GET',
            }).then(res => res.json());
            const xhsInfo = res?.data;
            console.log("xhsInfo", xhsInfo);
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: {
                    id: `${Math.random()}`,
                    noteId: xhsInfo.note_id,
                    longLink: xhsInfo.long_url.split('?')[0]
                }
            };
        }
        catch (e) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBZ0o7QUFDaEosTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsMkJBQTJCO0FBQzNCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUV0QyxrQ0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNmLGdCQUFnQjtJQUNoQixJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixVQUFVLEVBQUUsS0FBSztnQkFDakIscUJBQXFCLEVBQUUsZUFBZTthQUN2QztZQUNELE9BQU8sRUFBRTtnQkFDUCxVQUFVLEVBQUUsWUFBWTtnQkFDeEIsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLFVBQVUsRUFBRSxXQUFXO2dCQUN2QixxQkFBcUIsRUFBRSxrRUFBa0U7YUFDMUY7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLFFBQVEsRUFBRSxRQUFRO2dCQUNsQixVQUFVLEVBQUUsUUFBUTtnQkFDcEIscUJBQXFCLEVBQUUsZ0NBQWdDO2FBQ3hEO1NBQ0Y7S0FDRjtJQUNELFVBQVU7SUFDVixTQUFTLEVBQUU7UUFDVDtZQUNFLEdBQUcsRUFBRSxVQUFVO1lBQ2YsS0FBSyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUM7WUFDcEIsU0FBUyxFQUFFLHlDQUFjLENBQUMsV0FBVztZQUVyQyxLQUFLLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDckMsV0FBVyxFQUFFLENBQUMsb0NBQVMsQ0FBQyxHQUFHLEVBQUUsb0NBQVMsQ0FBQyxJQUFJLENBQUM7YUFFN0M7WUFDRCxTQUFTLEVBQUU7Z0JB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