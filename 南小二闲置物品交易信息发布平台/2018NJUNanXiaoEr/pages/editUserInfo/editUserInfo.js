// pages/my/mySetting/mySetting.js
let app = getApp();
let Bmob = app.globalData.Bmob;
Page({
	data: {
		userUniversity: '',
		userCollege: '',
		userEducation: '',
		userEntryYear: '',
		buttonLoading: false,
		university: ["南京大学"],
		universityIndex: 0,
		college: ["计算机科学与技术系", "文学院", "哲学系", "历史学院", "物理学院", "数学系", "天文与空间科学学院", "地球科学与工程学院", "大气科学学院", "地理与海洋科学学院", "电子科学与工程学院", "现代工程与应用科学学院", "新闻传播学院", "商学院", "外国语学院", "法学院", "生命科学学院", "政府管理学院", "马克思主义学院", "信息管理学院", "社会学院", "艺术学院", "河仁社会慈善学院", "化学化工学院", "环境学院", "医学院", "软件学院", "工程管理学院", "匡亚明学院", "外语部", "体育部", "艺术研究院", "中美文化研究中心", "建筑与城市规划学院", "海外教育学院", "创新创业学院", "美术研究院", "教育研究院", "中华文化研究院", "能源科学研究院", "模式动物研究所", "人工智能学院"],
		collegeIndex: 0,
		education: ["本科生", "硕士研究生", "博士研究生"],
		educationIndex: 0,
		entryYear: ["2012", "2013", "2014", "2015", "2016", "2017", "2018"],
		entryYearIndex: 4,
		birthdayDate: "1998-7-4",
		userRealName: "",
		selfIntroduction: "",
		userMail: "",
		oldEmail: "",
		emailVerified: false,
		mobilePhoneNumber: '',
		QQ: '',
		wechatId: '',
		remind: '加载中',
		emailDisabled: false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function () {
		let that = this;
		this.setData({
			userUniversity: this.data.university[0],
			userCollege: this.data.college[0],
			userEducation: this.data.education[0],
			userEntryYear: this.data.entryYear[4],
			wechatId: '',
			QQ: '',
			mobilePhoneNumber: ''
		})
		let db = Bmob.Query("_User");
		db.get(app.globalData.userObjectId).then(res => {
			if (res.university && !(res.university === undefined)) {
				that.setData({
					userUniversity: res.university,
					universityIndex: that.data.university.indexOf(res.university)
				});
			}
			if (res.college && !(res.college === undefined)) {
				that.setData({
					userCollege: res.college,
					collegeIndex: that.data.college.indexOf(res.college)
				});
			}
			if (res.education && !(res.education === undefined)) {
				that.setData({
					userEducation: res.education,
					educationIndex: that.data.education.indexOf(res.education)
				});
			}
			if (res.entryYear && !(res.entryYear === undefined)) {
				that.setData({
					userEntryYear: res.entryYear,
					entryYearIndex: that.data.entryYear.indexOf(res.entryYear)
				});
			}
			if (res.birthdayDate && !(res.birthdayDate === undefined)){
				that.setData({
					birthdayDate: res.birthdayDate
				});
			}
			if (res.wechatId && !(res.wechatId === undefined)) {
				that.setData({
					wechatId: res.wechatId,
				});
				console.log(that.data.wechatId);
			}
			if (res.QQ && !(res.QQ === undefined)) {
				that.setData({
					QQ: res.QQ,
				});
			}
			if (res.mobilePhoneNumber && !(res.mobilePhoneNumber === undefined)) {
				that.setData({
					mobilePhoneNumber: res.mobilePhoneNumber,
				});
			}
			if(res.email && !(res.email === undefined)){
				that.data.oldEmail = res.email;
				that.setData({
					userMail: res.email,
				});
			}
			if (res.emailVerified && !(res.emailVerified === undefined)){
				that.setData({
					emailVerified: res.emailVerified,
				});
				if(that.data.emailVerified){
					that.setData({
						emailDisabled: true
					});
				}
			}
			if (res.selfIntroduction && !(res.selfIntroduction === undefined)){
				that.setData({
					selfIntroduction: res.selfIntroduction
				});
			}
			if (res.userRealName && !(res.userRealName === undefined)){
				that.setData({
					userRealName: res.userRealName
				});
			}
			that.setData({
				remind: ''
			});
		});		
	},

	/*
	bindUniversityChange: function (e) {
		console.log(university);
		this.setData({
			universityIndex: e.detail.value,
			userUniversity: this.data.university[this.data.universityIndex]
		})
	},*/

	bindCollegeChange: function (e) {
		this.setData({
			collegeIndex: e.detail.value,
			userCollege: this.data.college[e.detail.value]
		});
		//console.log(this.data.userCollege);
	},

	bindEducationChange: function (e) {
		this.setData({
			educationIndex: e.detail.value,
			userEducation: this.data.education[e.detail.value]
		});
		//console.log(this.data.userEducation);
	},

	bindEntryYearChange: function (e) {
		this.setData({
			entryYearIndex: e.detail.value,
			userEntryYear: this.data.entryYear[e.detail.value]
		});
		//console.log(this.data.userEntryYear);
	},

	bindBirthdayDateChange: function (e) {
		this.setData({
			birthdayDate: e.detail.value,
		});
		//console.log(this.data.birthdayDate);
	},

	bindEmailInput: function(e) {
		this.setData({
			userMail: e.detail.value
		});
		//console.log(this.data.userMail);
	},

	/*
	yhr 5-20:
	邮箱验证
	*/
	toVerifyEmail: function() {
		let that = this;
		let reg = /^([0-9])+@smail.nju.edu.cn+/;
		//console.log(reg.test(this.data.userMail));
		if (that.data.emailVerified && that.data.oldEmail == that.data.userMail){
			wx.showModal({
				title: '提示',
				content: '您的邮箱已通过验证！',
			});
		}
		else if (reg.test(that.data.userMail)){
			let db = Bmob.Query("_User");
			db.get(app.globalData.userObjectId).then(res => {
				//res.set("email", that.data.userMail);
				res.set("wechatId", that.data.wechatId);
				res.set("QQ", that.data.QQ);
				if (that.data.mobilePhoneNumber == "") {
					res.unset("mobilePhoneNumber");
				}
				else {
					res.set("mobilePhoneNumber", that.data.mobilePhoneNumber);
				}
				res.set("university", that.data.userUniversity);
				res.set("college", that.data.userCollege);
				res.set("education", that.data.userEducation);
				res.set("entryYear", that.data.userEntryYear);
				res.set("email", that.data.userMail);
				res.set("selfIntroduction", that.data.selfIntroduction);
				res.set("userRealName", that.data.userRealName);
				res.set("birthdayDate", that.data.birthdayDate);
				return res.save();
			}).then(res => {
				Bmob.User.requestEmailVerify(that.data.userMail);
				wx.showModal({
					title: '提示',
					content: '验证邮件已发送，请及时确认！',
					success: function(res) {
						if(res.confirm){
							wx.reLaunch({
								url: '../../pages/personal/personal',
							});
						}
						else if(res.cancel){
							wx.reLaunch({
								url: '../../pages/personal/personal',
							});
						}
					}
				});
			});
		}
		else{
			wx.showModal({
				title: '提示',
				content: '您填入的不是南京大学学生邮箱地址！请重新填写。',
			});
		}
	},

	bindSelfIntroduction: function (e) {
		this.setData({
			selfIntroduction: e.detail.value
		});
		//console.log(this.data.selfIntroduction)
	},

	bindRealNameInput: function(e) {
		this.setData({
			userRealName: e.detail.value
		});
		//console.log(this.data.userRealName);
	},

	bindWechatInput: function (e) {
		this.setData({
			wechatId: e.detail.value
		});
		//console.log(this.data.wechatId);
	},

	bindQQInput: function (e) {
		this.setData({
			QQ: e.detail.value
		});
		//console.log(this.data.QQ);
	},

	bindPhoneInput: function (e) {
		this.setData({
			mobilePhoneNumber: e.detail.value
		});
		//console.log(this.data.mobilePhoneNumber);
	},
	
	bindSubmit: function () {
		let that = this;
		if (that.data.mobilePhoneNumber.length == 0 || that.data.mobilePhoneNumber.length == 11){
			this.setData({
				buttonLoading: true
			});
			let db = Bmob.Query("_User");
			db.get(app.globalData.userObjectId).then(res => {
				res.set("wechatId", that.data.wechatId);
				res.set("QQ", that.data.QQ);
				if (that.data.mobilePhoneNumber == "") {
					res.unset("mobilePhoneNumber");
				}
				else {
					res.set("mobilePhoneNumber", that.data.mobilePhoneNumber);
				}
				res.set("university", that.data.userUniversity);
				res.set("college", that.data.userCollege);
				res.set("education", that.data.userEducation);
				res.set("entryYear", that.data.userEntryYear);
				//res.set("email", that.data.userMail);
				res.set("selfIntroduction", that.data.selfIntroduction);
				res.set("userRealName", that.data.userRealName);
				res.set("birthdayDate", that.data.birthdayDate);
				res.save().then(res => {
					console.log(res);
				}).catch(err => {
					console.log(err);
				});
				that.setData({
					buttonLoading: false
				});
				wx.showToast({
					title: '修改成功',
					icon: 'success',
					duration: 1000,
				});
				that.sleep(1100);
				wx.reLaunch({
					url: '../../pages/personal/personal',
				});
			});
		}
		else{
			wx.showModal({
				title: '提示',
				content: '输入的手机号码格式不对。',
			});
		}
	},

	sleep: function (sleepTime) {
		for (var start = Date.now(); Date.now() - start <= sleepTime;) { }
	}
})