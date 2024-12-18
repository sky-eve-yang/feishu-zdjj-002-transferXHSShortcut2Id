import { basekit, FieldType, field, FieldComponent, FieldCode, NumberFormatter, AuthorizationType } from '@lark-opdev/block-basekit-server-api';
const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['replit.app']);

basekit.addField({
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
      component: FieldComponent.FieldSelect,
      
      props: {
        placeholder: t('placeholderShortcut'),
        supportType: [FieldType.Url, FieldType.Text],

      },
      validator: {
        required: true,
      }
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Object,
    extra: {
      icon: {
        light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/abjayvoz/ljhwZthlaukjlkulzlp/2024q3/telephone.svg?x-resource-account=public',
      },
      properties: [
        {
          key: 'id',
          isGroupByKey: true,
          type: FieldType.Text,
          title: 'id',
          hidden: true,
        },
        {
          key: 'noteId',
          type: FieldType.Text,
          title: t('noteId'),
          primary: true
        },
        {
          key: 'longLink',
          type: FieldType.Text,
          title: t('longLink')
        }
      ],
    },
  },
  execute: async (formItemParams: { shortcut: object }, context) => {
    const { shortcut = [] } = formItemParams;
    let shortcut_string = shortcut[0]?.link
    // console.log("shortcut_string", shortcut_string, typeof shortcut, shortcut)
    if (!shortcut_string) {
      return {
        code: FieldCode.Error,
        msg: '短链接不能为空',
      };
    }
    if (!/^http:\/\/xhslink.com\//.test(shortcut_string)) {
      console.log(shortcut_string)
      return {
        code: FieldCode.Error,
        msg: '短链接格式不正确',
      };
    }

    try {
      const res = await context.fetch(`https://feishu-field-short-transfer-xhs-shortcut-2-id-wuyi.replit.app/transfer_shortcut2id?shortcut=${shortcut_string}`, { // 已经在addDomainList中添加为白名单的请求
        method: 'GET',
      }).then(res => res.json());
      const xhsInfo = res?.data;
      console.log("xhsInfo", xhsInfo)
      return {
        code: FieldCode.Success,
        data: {
          id: `${Math.random()}`,
          noteId: xhsInfo.note_id,
          longLink: xhsInfo.long_url.split('?')[0]

        }
      }
    } catch (e) {
      return {
        code: FieldCode.Error,
      }
    }
  },
});
export default basekit;