// pages/message/message.js
var qcloud = require('../../vendor/wafer2-client-sdk/index');

// 引入配置
var config = require('../../config');
var QQMapWX = require('../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: '7IYBZ-URYWX-V4D4G-TAHG3-FTCCV-BSFBV'
});
var sliderWidth = 96; // 要设置slider的宽度，用于计算中间位置
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 500
});

var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};
var lat;
var lng;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["取送件", "同城代购", "代排队"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    dizhi1:'',
    information1:'从哪里出发',
    dizhi2:'',
    information2:'送到哪里去',
    thingType:'',
    weight:'要配送的物品类型，重量',
    latitude:'',
    longitude:'',
    localCity:'',
    realAddress:{},
    markers: [{

      id: 0,
      iconPath: '/images/location.png',
      latitude:28.727340,
      longitude:115.816720,
      width: 25,
      height: 25,
      callout: {
        content: '最快5分钟内接单',
        fontSize: 16,
        color: '#ffffff',
        bgColor: '#319ED3',
        padding: 8,
        borderRadius:15,
        boxShadow: '4px 8px 16px 0 rgba(0)',
        display:'ALWAYS'
      },
      
    }],

    controls: [{
      id: 1,
      iconPath: '/images/refresh.png',
      position: {
        left: 330,
        top: 300 - 50,
        width: 30,
        height: 30
      }
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    if(options.thingType != null && options.weight != null) {
      that.setData({
        thingType: options.thingType + ',' + options.weight + '公斤',
        weight: ''
      })
    }
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var key = '7IYBZ-URYWX-V4D4G-TAHG3-FTCCV-BSFBV'
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })

        wx.setStorage({
          key: 'location',
          data: res,
        })
        wx.request({
          url: 'https://apis.map.qq.com/ws/coord/v1/translate?locations=' + res.latitude + ',' + res.longitude + '&type=' + 5 + '&key=' + key,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data.locations[0])
            that.setData({
              realAddress: res.data.locations[0],
              latitude: res.data.locations[0].lat,
              longitude: res.data.locations[0].lng,
             
            })
          }

        })
        qqmapsdk.reverseGeocoder({

          location: {

            latitude: that.data.latitude,

            longitude: that.data.longitude

          },

          success: function (res) {

            console.log(res);

            let province = res.result.address_component.province;//省份

            let city = res.result.address_component.city;//城市

            that.setData({

              localCity: city

            })

          },

          fail: function (res) {

            console.log(res);

          }

        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  this.mapCtx = wx.createMapContext('myMap', this)
  },
 

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  fahuodizhi:function(){
    const session = qcloud.Session.get()
    if(session){
      wx.navigateTo({
        url: '/pages/fahuo/fahuo',
      })
    }else{
      showBusy('加载中');
      setTimeout(function(){
        wx.showModal({
          title: '提示',
          content: '未授权可能会影响部分功能使用，请前往授权',
          confirmText: '去授权',
          success: res => {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          }
        })
      },500)
    }
  },

 
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  
 show:function(){
   wx.navigateTo({
     url: '/pages/index/rule',
   })
 },
 userCenter:function(){
   wx.navigateTo({
     url: '/pages/userCenter/user',
   })
  //  const session = qcloud.Session.get()
  //  if (session) {
  //    wx.navigateTo({
  //      url: '/pages/userCenter/user',
  //    })
  //  } else {
  //    showBusy('加载中');
  //    setTimeout(function () {
  //      wx.showModal({
  //        title: '提示',
  //        content: '未授权可能会影响部分功能使用，请前往授权',
  //        confirmText: '去授权',
  //        success: res => {
  //          if (res.confirm) {
  //            wx.navigateTo({
  //              url: '/pages/login/login',
  //            })
  //          }
  //        }
  //      })
  //    }, 500)
  //  }
 },
  regionchange:function(e){
    this.mapCtx.getCenterLocation({
      success: function (res) {
        lat = res.latitude,
        lng = res.longitude
        
      }
    })
    this.mapCtx.translateMarker({
      markerId: 0,
     
      duration: 500,
      destination: {
        latitude: lat,
        longitude:lng,
      }
    })
   

  },
refresh:function(){
  var that = this
  this.mapCtx.moveToLocation()
wx.getStorage({
  key: 'location',
  success: function(res) {
    
  that.setData({
    latitude:res.data.latitude,
    longitude:res.data.longitude
  })
  },
}),
lat = that.data.latitude;
lng = that.data.longitude
  this.mapCtx.translateMarker({
    markerId: 0,

    duration: 500,
    destination: {
      latitude: lat,
      longitude: lng
    }
   
  })
 console.log(that.data.latitude)
}
})

