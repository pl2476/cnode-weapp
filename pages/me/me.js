import Switch from "../../bower_components/zanui-weapp/dist/switch/index";
import { formatTime } from "../../utils";

Page(
  Object.assign({}, Switch, {
    data: {},
    handleZanSwitchChange(e) {
      // For switch
      this.setData({
        [e.componentId]: e.checked
      });
      getApp().globalData[e.componentId] = e.checked;
      wx.setStorage({
        key: e.componentId,
        data: e.checked
      });
    },
    onLoad(options) {
      const app = getApp();
      const { hasTail, messagePushEnabled } = app.globalData;
      this.setData({ hasTail, messagePushEnabled });

      const { loginname } = app.globalData;
      wx.showToast({
        title: "加载中",
        icon: "loading"
      });
      wx.requestCNode({
        url: `/user/${loginname}`,
        success: res => {
          const json = res.data.data;
          this.setData({
            user: json,
            time: formatTime(json.create_at)
          });
          wx.hideToast();

          // Set recent topics and replies to global data
          app.globalData.recent_topics = json.recent_topics
          app.globalData.recent_replies = json.recent_replies
        }
      });
    }
  })
);
