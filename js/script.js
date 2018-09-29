

			var ChangeImg={

				imgList : ['img/bg1.jpg' ,'img/bg3.jpg', 'img/bg4.jpg', 'img/bg5.jpg', 'img/bg6.jpg'],
					
			    getImgListShowed : function(){
					return JSON.parse( localStorage.getItem('imgListShowed') )|| []
				},

				convertHoursToMilSec: function(h){
					return h*3600000
				},

				random : function (min, max){
					 return	Math.round((Math.random()*(max-min))+min);
				},

				 setLastUniqueImg: function (){
					var lastIndex= this.getImgListShowed()[this.getImgListShowed().length-1];
					document.querySelector('main').style.background = "url("+this.imgList[lastIndex]+") no-repeat center";
				},

				setAndReturnUnique: function (){
						var imgIndex= this.random(0, this.imgList.length - 1);
						while(this.getImgListShowed().indexOf(imgIndex) > -1){
							imgIndex= this.random(0, this.imgList.length - 1)
						};
						this.changeImgListShowed(imgIndex);
							return imgIndex
					},

				changeImg: function (){
					if (this.imgList.length == this.getImgListShowed().length) { this.changeImgListShowed() };
					var imgIndex= this.setAndReturnUnique();
					document.querySelector('main').style.background = "url("+this.imgList[imgIndex]+") no-repeat center";
				},

				changeImgListShowed: function (imgIndex){
					if (imgIndex!=undefined){
						var newImgListShowed = this.getImgListShowed();
						newImgListShowed.push(imgIndex);
						newImgListShowed=JSON.stringify(newImgListShowed);
					} else {
						var newImgListShowed=JSON.stringify([]);
					}
					localStorage.setItem('imgListShowed', newImgListShowed);
				},

				setChangeTime: function (){
					var changeTime = Date.now()+this.convertHoursToMilSec(8);
					localStorage.setItem('changeTime', changeTime);
				},

				checkTime: function (){
					var changeTime = localStorage.getItem('changeTime');
					return Date.now() >= changeTime;
				},

};

	if ( !localStorage.changeTime || !localStorage.imgListShowed ){
				ChangeImg.setChangeTime();
				ChangeImg.changeImgListShowed(0);
			}else{
				if (ChangeImg.checkTime()){
					ChangeImg.changeImg();
					ChangeImg.setChangeTime();
				}else{
					ChangeImg.setLastUniqueImg();
				}
			}
	