// pages/yaoqiu/yaoqiu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
    grids: [{
      id:0,
        flag:0,
        image: "/images/icon/eat.png",
        name: "餐饮"
      },
      {
        id: 1,
        flag: 0,
        image:'/images/icon/file.png',
        name: "文件"
      },

      {
        id: 2,
        flag: 0,
        image:'/images/icon/yaopin.png',
        name: "药品"
      }, 
     
      {
        id: 3,
        flag: 0,
        image:'/images/icon/cake.png',
        name: "蛋糕"
      }, 
      {
        id: 4,
        flag: 0,
        image: '/images/icon/flower.png',
        name: "鲜花"
      }, 
      {
        id: 5,
        flag: 0,
        image:'/images/icon/key.png',
        name: "钥匙"
      }, 
      {
        id:6,
        flag: 0,
        image:'/images/icon/shuma.png',
        name: "数码"
      },
       {
         id: 7,
         flag: 0,
         image:'/images/icon/clothes.png',
        name: "服饰"
      }, 
      {
        id: 8,
        flag: 0,
        image:'/images/icon/other.png',
        name: "其他"
      }
    ],
    weight: '小于5'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  slider: function(e) {
    var that = this;
    if (e.detail.value == 4) {
      that.setData({
        weight: "小于5"
      })
    } else {
      that.setData({
        weight: e.detail.value
      })
    }
  },
  slider2: function(e) {
    var that = this;
    if (e.detail.value == 4) {
      that.setData({
        weight: "小于5"
      })
    } else {
      that.setData({
        weight: e.detail.value
      })
    }
  },

  select:function(event){
    var item = event.currentTarget.dataset.item;
   item.flag = 1;
    var id = parseInt(item.id);
    let grids = this.data.grids;
    grids[id].flag = item.flag;
    this.setData({
      grids:grids
    })
  console.log(this.data.grids);
   
  },
  submit:function(){
    let grids = this.data.grids;
    var detail ;
    for( var i = 0; i < grids.length; i++) {
      if(grids[i].flag == 1) {
        detail = grids[i].name;
      }
    }
    console.log(detail);
    wx.reLaunch({

     url: '/pages/index/index?thingType=' + detail + "&weight=" + this.data.weight,
   })
  }
})