/*****************************************************************
** Copyright (c) 南京奥派（AllPass）信息技术有限公司技术部
** 创建人:      jxl
** 创建日期:    2014年2月19日  
** 描 述:       通用方法
** 修改人:      
** 修改日期:    
** 修改说明:
**-----------------------------------------------------------------
 *******************************************************************/
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Diagnostics;
using System.Reflection;
using System.Runtime.Serialization.Json;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Configuration;
using System.Drawing;
using System.Threading;
using System.Xml.Linq;
using System.Linq;
using System.Net;

namespace Funtion
{
	public static class CommonFunction
	{
		/// <summary>
		/// 转换头像
		/// </summary>
		/// <param name="content">可能包含表情文字的内容</param>
		/// <param name="path">表情图片的相对路径</param>
		public static string FaceTopic2Img(string content, string path = "../../img/face/")
		{
			content = content.Replace("[微笑]", "<img src='" + path + "weixiao.gif'/>")
				.Replace("[爱你]", "<img src='" + path + "aini.gif'/>")
					.Replace("[撇嘴]", "<img src='" + path + "pizui.gif'/>")
					.Replace("[爱情]", "<img src='" + path + "aiqing.gif'/>")
					.Replace("[色]", "<img src='" + path + "se.gif'/>")
					.Replace("[发呆]", "<img src='" + path + "fadai.gif'/>")
					.Replace("[得意]", "<img src='" + path + "deyi.gif'/>")
					.Replace("[流泪]", "<img src='" + path + "liulei.gif'/>")
					.Replace("[害羞]", "<img src='" + path + "haixiu.gif'/>")
					.Replace("[闭嘴]", "<img src='" + path + "bizui.gif'/>")
					.Replace("[睡觉]", "<img src='" + path + "shuijiao.gif'/>")
					.Replace("[睡]", "<img src='" + path + "shuijiao.gif'/>")
					.Replace("[大哭]", "<img src='" + path + "daku.gif'/>")
					.Replace("[尴尬]", "<img src='" + path + "gangga.gif'/>")
					.Replace("[大怒]", "<img src='" + path + "danu.gif'/>")
					.Replace("[发怒]", "<img src='" + path + "danu.gif'/>")
					.Replace("[调皮]", "<img src='" + path + "tiaopi.gif'/>")
					.Replace("[呲牙]", "<img src='" + path + "ciya.gif'/>")
					.Replace("[惊讶]", "<img src='" + path + "jingya.gif'/>")
					.Replace("[难过]", "<img src='" + path + "nanguo.gif'/>")
					.Replace("[酷]", "<img src='" + path + "ku.gif'/>")
					.Replace("[冷汗]", "<img src='" + path + "lenghan.gif'/>")
					.Replace("[抓狂]", "<img src='" + path + "zhuakuang.gif'/>")
					.Replace("[吐]", "<img src='" + path + "tu.gif'/>")
					.Replace("[偷笑]", "<img src='" + path + "touxiao.gif'/>")
					.Replace("[可爱]", "<img src='" + path + "keai.gif'/>")
					.Replace("[白眼]", "<img src='" + path + "baiyan.gif'/>")
					.Replace("[傲慢]", "<img src='" + path + "aoman.gif'/>")
					.Replace("[饥饿]", "<img src='" + path + "er.gif'/>")
					.Replace("[困]", "<img src='" + path + "kun.gif'/>")
					.Replace("[惊恐]", "<img src='" + path + "jingkong.gif'/>")
					.Replace("[流汗]", "<img src='" + path + "liuhan.gif'/>")
					.Replace("[憨笑]", "<img src='" + path + "haha.gif'/>")
					.Replace("[大兵]", "<img src='" + path + "dabing.gif'/>")
					.Replace("[奋斗]", "<img src='" + path + "fendou.gif'/>")
					.Replace("[咒骂]", "<img src='" + path + "ma.gif'/>")
					.Replace("[骂]", "<img src='" + path + "ma.gif'/>")
					.Replace("[疑问]", "<img src='" + path + "wen.gif'/>")
					.Replace("[问]", "<img src='" + path + "wen.gif'/>")
					.Replace("[嘘]", "<img src='" + path + "xu.gif'/>")
					.Replace("[晕]", "<img src='" + path + "yun.gif'/>")
					.Replace("[折磨]", "<img src='" + path + "zhemo.gif'/>")
					.Replace("[衰]", "<img src='" + path + "shuai.gif'/>")
					.Replace("[骷髅]", "<img src='" + path + "kulou.gif'/>")
					.Replace("[敲打]", "<img src='" + path + "da.gif'/>")
					.Replace("[打]", "<img src='" + path + "da.gif'/>")
					.Replace("[再见]", "<img src='" + path + "zaijian.gif'/>")
					.Replace("[擦汗]", "<img src='" + path + "cahan.gif'/>")
					.Replace("[挖鼻]", "<img src='" + path + "wabi.gif'/>")
					.Replace("[抠鼻]", "<img src='" + path + "wabi.gif'/>")
					.Replace("[鼓掌]", "<img src='" + path + "guzhang.gif'/>")
					.Replace("[糗大了]", "<img src='" + path + "qioudale.gif'/>")
					.Replace("[坏笑]", "<img src='" + path + "huaixiao.gif'/>")
					.Replace("[左哼哼]", "<img src='" + path + "zuohengheng.gif'/>")
					.Replace("[右哼哼]", "<img src='" + path + "youhengheng.gif'/>")
					.Replace("[哈欠]", "<img src='" + path + "haqian.gif'/>")
					.Replace("[鄙视]", "<img src='" + path + "bishi.gif'/>")
					.Replace("[委屈]", "<img src='" + path + "weiqu.gif'/>")
					.Replace("[哭了]", "<img src='" + path + "ku.gif'/>")
					.Replace("[快哭了]", "<img src='" + path + "kuaikule.gif'/>")
					.Replace("[阴险]", "<img src='" + path + "yinxian.gif'/>")
					.Replace("[亲亲]", "<img src='" + path + "qinqin.gif'/>")
					.Replace("[示爱]", "<img src='" + path + "kiss.gif'/>")
					.Replace("[亲吻]", "<img src='" + path + "kiss.gif'/>")
					.Replace("[吓]", "<img src='" + path + "xia.gif'/>")
					.Replace("[可怜]", "<img src='" + path + "kelian.gif'/>")
					.Replace("[菜刀]", "<img src='" + path + "caidao.gif'/>")
					.Replace("[西瓜]", "<img src='" + path + "xigua.gif'/>")
					.Replace("[啤酒]", "<img src='" + path + "pijiu.gif'/>")
					.Replace("[篮球]", "<img src='" + path + "lanqiu.gif'/>")
					.Replace("[乒乓]", "<img src='" + path + "pingpang.gif'/>")
					.Replace("[咖啡]", "<img src='" + path + "kafei.gif'/>")
					.Replace("[饭]", "<img src='" + path + "fan.gif'/>")
					.Replace("[猪头]", "<img src='" + path + "zhutou.gif'/>")
					.Replace("[花]", "<img src='" + path + "hua.gif'/>")
					.Replace("[玫瑰]", "<img src='" + path + "hua.gif'/>")
					.Replace("[凋谢]", "<img src='" + path + "diaoxie.gif'/>")
					.Replace("[爱心]", "<img src='" + path + "love.gif'/>")
					.Replace("[心碎]", "<img src='" + path + "xinsui.gif'/>")
					.Replace("[蛋糕]", "<img src='" + path + "dangao.gif'/>")
					.Replace("[闪电]", "<img src='" + path + "shandian.gif'/>")
					.Replace("[地雷]", "<img src='" + path + "zhadan.gif'/>")
					.Replace("[炸弹]", "<img src='" + path + "zhadan.gif'/>")
					.Replace("[刀]", "<img src='" + path + "dao.gif'/>")
					.Replace("[足球]", "<img src='" + path + "qiu.gif'/>")
					.Replace("[虫]", "<img src='" + path + "chong.gif'/>")
					.Replace("[瓢虫]", "<img src='" + path + "chong.gif'/>")
					.Replace("[便便]", "<img src='" + path + "dabian.gif'/>")
					.Replace("[月亮]", "<img src='" + path + "yueliang.gif'/>")
					.Replace("[太阳]", "<img src='" + path + "taiyang.gif'/>")
					.Replace("[礼物]", "<img src='" + path + "liwu.gif'/>")
					.Replace("[拥抱]", "<img src='" + path + "yongbao.gif'/>")
					.Replace("[强]", "<img src='" + path + "qiang.gif'/>")
					.Replace("[弱]", "<img src='" + path + "ruo.gif'/>")
					.Replace("[握手]", "<img src='" + path + "woshou.gif'/>")
					.Replace("[胜利]", "<img src='" + path + "shengli.gif'/>")
					.Replace("[佩服]", "<img src='" + path + "peifu.gif'/>")
					.Replace("[抱拳]", "<img src='" + path + "peifu.gif'/>")
					.Replace("[勾引]", "<img src='" + path + "gouyin.gif'/>")
					.Replace("[拳头]", "<img src='" + path + "quantou.gif'/>")
					.Replace("[差劲]", "<img src='" + path + "chajin.gif'/>")
					.Replace("[干杯]", "<img src='" + path + "cheer.gif'/>")
					.Replace("[no]", "<img src='" + path + "no.gif'/>")
					.Replace("[ok]", "<img src='" + path + "ok.gif'/>")
					.Replace("[NO]", "<img src='" + path + "no.gif'/>")
					.Replace("[OK]", "<img src='" + path + "ok.gif'/>")
					.Replace("[给力]", "<img src='" + path + "geili.gif'/>")
					.Replace("[飞吻]", "<img src='" + path + "feiwen.gif'/>")
					.Replace("[跳跳]", "<img src='" + path + "tiao.gif'/>")
					.Replace("[跳]", "<img src='" + path + "tiao.gif'/>")
					.Replace("[发抖]", "<img src='" + path + "fadou.gif'/>")
					.Replace("[怄火]", "<img src='" + path + "dajiao.gif'/>")
					.Replace("[大叫]", "<img src='" + path + "dajiao.gif'/>")
					.Replace("[转圈]", "<img src='" + path + "zhuanquan.gif'/>")
					.Replace("[磕头]", "<img src='" + path + "ketou.gif'/>")
					.Replace("[回头]", "<img src='" + path + "huitou.gif'/>")
					.Replace("[跳绳]", "<img src='" + path + "tiaosheng.gif'/>")
					.Replace("[挥手]", "<img src='" + path + "huishou.gif'/>")
					.Replace("[激动]", "<img src='" + path + "jidong.gif'/>")
					.Replace("[街舞]", "<img src='" + path + "tiaowu.gif'/>")
					.Replace("[献吻]", "<img src='" + path + "xianwen.gif'/>")
					.Replace("[左太极]", "<img src='" + path + "zuotaiji.gif'/>")
					.Replace("[右太极]", "<img src='" + path + "youtaiji.gif'/>");
			return content;

		}
	
	}
}
