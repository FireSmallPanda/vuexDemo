/**
 * Created by Administrator on 2017/6/20.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import session from '@/common/js/sessionstorageUtil.js';
import _ from 'lodash';
Vue.use(Vuex);

/**
 * 银行数字start
 */
const bank_typeId = '102100099996,103100000026,104100000004,105100000017,301290000007,302100011000,303100000006,304100040000,305100000013,306581000003,307584007998,308584000013,309391000011,310290000013,313100000013,313110000017,313121006888,313127000013,313131000016,313138000019,313141052422,313143005157,313146000019,313148053964,313161000017,313168000003,313175000011,313191000011,313192000013,313193057846,313205057830,313221030008,313222080002,313223007007,313227000012,313227600018,313228000276,313229000008,313241066661,313261000018,313261099913,313301008887,313301099999,313305066661,313312300018,313331000014,313332082914,313332090019,313333007331,313335081005,313336071575,313337009004,313338009688,313338707013,313345001665,313345010019,313345400010,313391080007,313393080005,313397075189,313421087506,313424076706,313428076517,313433076801,313451000019,313452060150,313453001017,313454000016,313455000018,313456000108,313458000013,313461000012,313463000993,313463400019,313465000010,313468000015,313473070018,313473200011,313491000232,313491099996,313493080539,313495081900,313501080608,313521000011,313521006000,313551070008,313551088886,313581003284,313585000990,313586000006,313591001001,313602088017,313611001018,313614000012,313617000018,313651099999,313653000013,313655091983,313656000019,313658000014,313659000016,313673093259,313701098010,313731010015,313736000019,313741095715,313791000015,313791030003,313821001016,313851000018,313871000007,313881000002,313882000012,314110000011,314302066666,314302200018,314305106644,314305206650,314305400015,314305506621,314305670002,314581000011,314588000016,314641000014,314651000000,314653000011,315456000105,316331000018,317110010019,318110000014,319361000013,320100010011,320343800019,320345790018,320428090311,320455000019,320584002002,320653000104,320687000016,321667090019,322290000011,323331000001,323584000888,325290000012,402100000018,402241000015,402301099998,402331000007,402332010004,402361018886,402391000068,402421099990,402451000010,402521000032,402521090019,402581090008,402584009991,402602000018,402611099974,402641000014,402651020006,402701002999,402731057238,402791000010,402871099996,403100000004,502290000006,593100000020,595100000007,596110000013,597100000014,781393010011,787290000019'.split(',')
const bank_name = '工商银行,农业银行,中国银行,建设银行,交通银行,中信银行,中国光大银行,华夏银行,民生银行,广发银行股份有限公司,平安银行（原深圳发展银行）,招商银行,兴业银行,上海浦东发展银行,北京银行,天津银行,河北银行股份有限公司,邯郸市商业银行,邢台银行,张家口市商业银行,承德银行,沧州银行,廊坊银行,衡水银行,晋商银行网上银行,晋城银行,晋中银行,内蒙古银行,包商银行股份有限公司,乌海银行,鄂尔多斯银行,盛京银行,大连银行,鞍山市商业银行,锦州银行,葫芦岛银行,营口银行,阜新银行结算中心,吉林银行,哈尔滨银行结算中心,龙江银行,南京银行,江苏银行股份有限公司,苏州银行,江苏长江商行,杭州银行,宁波银行,宁波通商银行股份有限公司,温州银行,嘉兴银行清算中心,湖州银行,绍兴银行,金华银行股份有限公司,浙江稠州商业银行,台州银行,浙江泰隆商业银行,浙江民泰商业银行,福建海峡银行,厦门银行,泉州银行,南昌银行,九江银行股份有限公司,赣州银行,上饶银行,齐鲁银行,青岛银行,齐商银行,枣庄银行,东营银行,烟台银行,潍坊银行,济宁银行,泰安市商业银行,莱商银行,威海市商业银行,德州银行,临商银行,日照银行,郑州银行,中原银行,洛阳银行,平顶山银行,焦作市商业银行,汉口银行,湖北银行,华融湘江银行,长沙银行,广州银行,珠海华润银行清算中心,广东华兴银行,广东南粤银行股份有限公司,东莞银行,广西北部湾银行,柳州银行,桂林银行股份有限公司,成都银行,重庆银行股份有限公司,自贡市商业银行清算中心,攀枝花市商业银行,德阳银行,绵阳市商业银行,南充市商业银行,贵阳银行,富滇银行,曲靖市商业银行,玉溪市商业银行,西安银行,长安银行,兰州银行股份有限公司,青海银行,宁夏银行,乌鲁木齐市商业银行,昆仑银行,天津滨海农村商业银行股份有限公司,无锡农村商业银行,江阴农商银行,太仓农商行,昆山农村商业银行,吴江农村商业银行,常熟农村商业银行,张家港农村商业银行,广州农村商业银行,顺德农村商业银行,海口联合农村商业银行,成都农村商业银行股份有限公司,重庆农村商业银行,恒丰银行,浙商银行,天津农商银行,渤海银行,徽商银行,北京顺义银座村镇银行,浙江景宁银座村镇银行,浙江三门银座村镇银行,江西赣州银座村镇银行,东营莱商村镇银行股份有限公司,深圳福田银座村镇银行,重庆渝北银座村镇银行,重庆黔江银座村镇银行,重庆三峡银行,上海农商银行,浙江网商银行,深圳前海微众银行,上海银行,北京农村商业银行,吉林农村信用社,江苏省农村信用社联合社,浙江省农村信用社,鄞州银行,安徽省农村信用社联合社,福建省农村信用社,农村信用社,山东省农联社,湖北农信,武汉农村商业银行,广东省农信,深圳农商行,东莞农村商业银行,广西农村信用社（合作银行）,海南省农村信用社,四川省联社,贵州省农村信用社联合社,云南省农村信用社,陕西信合,黄河农村商业银行,中国邮政储蓄银行,东亚银行（中国）有限公司,友利银行,新韩银行中国,企业银行,韩亚银行,厦门国际银行,富邦华一银行'.split(',')
const bank_nums = {}
for (let i=0; i<bank_name.length; i++) {
  bank_nums[bank_name[i]] = bank_typeId[i]
}
// 银行数字end

// 获取数据
const dict1 = "dict1";
const dict2 = "dict2";
const dict8 = "dict8";
const dict9 = "dict9";
const dict10 = "dict10";
const dict11 = "dict11";
const dict12a = "dict12a";
const dict12b = "dict12b";
const dict13 = "dict13";
const dict14 = "dict14";
const dict15 = "dict15";
const dict16 = "dict16";
const dict17 = "dict17";
const dict19 = "dict19";
const dict20 = "dict20";
const dict21 = "dict21";
const dict22 = "dict22";
const dict24 = "dict24";
const dict27 = "dict27";
const dict28 = "dict28";
const dict18 = "dict18";
const dict3 = "dict3";
const dict4 = "dict4";
const dict33 = "dict33";
const dict34 = "dict34";
const dict35 = "dict35";
const dict36 = "dict36";
const dict37 = "dict37";
const dict38 = "dict38";
const dict39 = "dict39";
const dict40 = "dict40";
const dict41 = "dict41";
const dict42 = "dict42";

const dict43 = "dict43";
const dict44 = "dict44";      // 资产管理排序
const dict46 = "dict46";
const dictColor  = "dictColor";
// action
const getSystemDicts = "dict/getSystemDicts";


export default{
  state: {
    bank_nums,
    dicts: [
      {value: "", text: ""}
    ], // 字典
    projectColor:[//项目颜色
      {
        text:'#ffffff',
        value:'1'
      },
      {
        text:'#030303',
        value:'2'
      },
      {
        text:'#eeece1',
        value:'3'
      },
      {
        text:'#1f497d',
        value:'4'
      },
      {
        text:'#4f81bd',
        value:'5'
      },
      {
        text:'#c0504d',
        value:'6'
      },
      {
        text:'#9bbb59',
        value:'7'
      },
      {
        text:'#8064a2',
        value:'8'
      },
      {
        text:'#4bacc6',
        value:'9'
      },
      {
        text:'#f79646',
        value:'10'
      },
      {
        text:'#f2f2f2',
        value:'11'
      },
      {
        text:'#7f7f7f',
        value:'12'
      },
      {
        text:'#ddd9c3',
        value:'13'
      },
      {
        text:'#c6d9f1',
        value:'14'
      },
      {
        text:'#dce6f2',
        value:'15'
      },
      {
        text:'#f2dcdb',
        value:'16'
      },
      {
        text:'#ebf1de',
        value:'17'
      },
      {
        text:'#e6e0ec',
        value:'18'
      },
      {
        text:'#dbeef4',
        value:'19'
      },
      {
        text:'#fdeada',
        value:'20'
      },
      {
        text:'#d9d9d9',
        value:'21'
      },
      {
        text:'#595959',
        value:'22'
      },
      {
        text:'#c4bd97',
        value:'23'
      },
      {
        text:'#8eb4e3',
        value:'24'
      },
      {
        text:'#b9cde5',
        value:'25'
      },
      {
        text:'#e6b9b8',
        value:'26'
      },
      {
        text:'#d7e4bd',
        value:'27'
      },
      {
        text:'#ccc1da',
        value:'28'
      },
      {
        text:'#b7dee8',
        value:'29'
      },
      {
        text:'#fcd5b5',
        value:'30'
      },
      {
        text:'#bfbfbf',
        value:'31'
      },
      {
        text:'#404040',
        value:'32'
      },
      {
        text:'#948a54',
        value:'33'
      },
      {
        text:'#558ed5',
        value:'34'
      },
      {
        text:'#95b3d7',
        value:'35'
      },
      {
        text:'#d99694',
        value:'36'
      },
      {
        text:'#c3d69b',
        value:'37'
      },
      {
        text:'#b3a2c7',
        value:'38'
      },
      {
        text:'#93cddd',
        value:'39'
      },
      {
        text:'#fac090',
        value:'40'
      }, {
        text:'#a6a6a6',
        value:'41'
      },
      {
        text:'#262626',
        value:'42'
      },
      {
        text:'#4a452a',
        value:'43'
      },
      {
        text:'#17375e',
        value:'44'
      },
      {
        text:'#376092',
        value:'45'
      },
      {
        text:'#953735',
        value:'46'
      },
      {
        text:'#77933c',
        value:'47'
      }, {
        text:'#604a7b',
        value:'48'
      },
      {
        text:'#31859c',
        value:'49'
      },
      {
        text:'#e46c0a',
        value:'50'
      },
      {
        text:'#7f7f7f',
        value:'51'
      },
      {
        text:'#0d0d0d',
        value:'52'
      },
      {
        text:'#1e1c11',
        value:'53'
      },
      {
        text:'#10253f',
        value:'54'
      },
      {
        text:'#254061',
        value:'55'
      },
      {
        text:'#632523',
        value:'56'
      },
      {
        text:'#4f6228',
        value:'57'
      },
      {
        text:'#403152',
        value:'58'
      },
      {
        text:'#215968',
        value:'59'
      },
      {
        text:'#984807',
        value:'60'
      },
      {
        text:'#800303',
        value:'61'
      },
      {
        text:'#ff0303',
        value:'62'
      },
      {
        text:'#ff6603',
        value:'63'
      },
      {
        text:'#ffff03',
        value:'64'
      },
      {
        text:'#ccffcc',
        value:'65'
      },
      {
        text:'#038003',
        value:'66'
      },
      {
        text:'#3366ff',
        value:'67'
      },
      {
        text:'#0303ff',
        value:'68'
      },
      {
        text:'#030390',
        value:'69'
      },
      {
        text:'#660366',
        value:'70'
      }
    ],

  },

  mutations: {
    [getSystemDicts](state) { // 改变path
      state.dicts = session.fetch("dicts")
    },
  },
  getters: {
    getBankNums: state => state.bank_nums,
    [dict1]: state => { // 性别
      return state.dicts.filter(item => item.group_id == "1");
    },
    [dict2]: state => { // 类别
      return state.dicts.filter(item => item.group_id == "2");
    },
    [dict8]: state => { // 禁用公司搜索类型
      return state.dicts.filter(item => item.group_id == "8");
    },
    [dict9]: state => { // 禁用用户搜索类型
      return state.dicts.filter(item => item.group_id == "9");
    },
    [dict10]: state => { // 积分惩罚公司搜索类型
      return state.dicts.filter(item => item.group_id == "10");
    },
    [dict11]: state => { // 积分惩罚员工搜索类型
      return state.dicts.filter(item => item.group_id == "11");
    },
    [dict12a]: state => { // 禁用用户类型
      return _.remove(state.dicts.filter(item => item.group_id == "12"),(item)=>{return item.value!='4';});
    },
    [dict12b]: state => { // 禁用公司类型
      return _.remove(state.dicts.filter(item => item.group_id == "12"),(item)=>{return item.value!='5';});
    },
    [dict13]: state => { // 用户组
      return state.dicts.filter(item => item.group_id == "13");
    },
    [dict14]: state => { // 用户组
      return state.dicts.filter(item => item.group_id == "14");
    },
    [dict15]: state => { // 用户组
      return state.dicts.filter(item => item.group_id == "15");
    },
    [dict16]: state => { // 用户管理（公司）
      return state.dicts.filter(item => item.group_id == "16");
    },
    [dict17]: state => { // 用户管理（用户）
      return state.dicts.filter(item => item.group_id == "17");
    },
    [dict19]: state => { // 用户管理（用户）
      return state.dicts.filter(item => item.group_id == "19");
    },
    [dict20]: state => { // 用户管理（用户）
      return state.dicts.filter(item => item.group_id == "20");
    },
    [dict21]: state => { // 推荐关注 （公司）
      return state.dicts.filter(item => item.group_id == "21");
    },
    [dict22]: state => { // 推荐关注 优先级（公司）
      return state.dicts.filter(item => item.group_id == "22");
    },
    [dict24]: state => { // 交易记录
      return state.dicts.filter(item => item.group_id == "24");
    },
    [dict27]: state => { // 员工编辑框的状态
      return state.dicts.filter(item => item.group_id == "27");
    },
    [dict28]: state => { // 学历
      return state.dicts.filter(item => item.group_id == "28");
    },
    [dict18]: state => { //关系
      return state.dicts.filter(item => item.group_id == "18");
    },
    [dict3]: state => { // 仲裁类型
      return state.dicts.filter(item => item.group_id == "3");
    },
    [dict4]: state => { //仲裁状态
      return state.dicts.filter(item => item.group_id == "4");
    },
    [dict33]: state => { //公司搜索条件
      return state.dicts.filter(item => item.group_id == "33");
    },
    [dict34]: state => { //公司搜索条件
      return state.dicts.filter(item => item.group_id == "34");
    },
    [dict35]: state => { //公司搜索条件
      return state.dicts.filter(item => item.group_id == "35");
    },
    [dict36]: state => { //公司搜索条件
      return state.dicts.filter(item => item.group_id == "36");
    },
    [dict37]: state => { //公司搜索条件
      return state.dicts.filter(item => item.group_id == "37");
    },
    [dict38]: state => { //公司搜索条件
      return state.dicts.filter(item => item.group_id == "38");
    },
    [dict39]: state => { //公司搜索条件
      return state.dicts.filter(item => item.group_id == "39");
    },
    [dict40]: state => { //公司搜索条件
      return state.dicts.filter(item => item.group_id == "40");
    },
    [dict41]: state => { //公司搜索条件
      return state.dicts.filter(item => item.group_id == "41");
    },
    [dict42]: state => { //公司搜索条件
      return state.dicts.filter(item => item.group_id == "42");
    },
    [dict43]: state => { //公司搜索条件
      return state.dicts.filter(item => item.group_id == "43");
    },
    [dict44]: state => { // 文件搜索排序
      return state.dicts.filter(item => item.group_id == "44");
    },
    [dict46]: state => { // 评论排序
      return state.dicts.filter(item => item.group_id == "46");
    },
    [dictColor]: state => { // 颜色字典
      return state.projectColor;

    }
  },

  actions: {
    [getSystemDicts]({commit, state}){ // 获取字典
      // 保存数据
      commit(getSystemDicts);
      // if (state.dicts != null && state.dicts.length > 1) { // 如果已经有则不用请求后台
      //   return;
      // }
      $.ajax({
        type: "post",
        url: "api/cgwas/systemAction/getSystemDicts.json",
        data: {},
      }).then((response) => {
        if (response.state) {
          // session 保存数据
          session.save("dicts", response.data);
          // 保存数据
          commit(getSystemDicts);
        } else {
          // alert(response.message)
        }
      }).catch((respone) => {
        var dicts = [
          {value: "", text: ""}
        ];
        session.save("dicts", dicts);
        commit(getSystemDicts);
        console.log("发生错误");
      });
    }
  }

}
