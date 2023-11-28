<template>
	<view class="card">
		<image class="image" :src="imageUrl" alt="" mode="widthFix">
		<view class="title">
			{{ title }}
		</view>
		<view class="bottom">
			<view class="avatar">
				<image class="avatar-img" :src="authorAvatar" alt="">
			</view>
			<view class="authorName">
				{{ authorName }}
			</view>
			<view class="likes">
				<uni-icons type="hand-up" size="14"></uni-icons>
				<view class="likeNum">
					{{ likeNum }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "NoteCard",
		data() {
			return {

			};
		},
		props: {
			imageUrl: {
				type: String,
				required: true
			},
			title: {
				type: String,
				required: true
			},
			authorAvatar: {
				type: String,
				required: true
			},
			authorName: {
				type: String,
				required: true
			},
			likeNum: {
				type: Number,
				required: true
			}
		}
	}
</script>

<style lang="less">
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 5px;
		padding-bottom: 5px;
		background-color: #fff;
		
		.image {
			display: block;
			width: 342rpx;
		}
		
		.title {
			display: -webkit-box;
			width: 95%;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-top: 5px;
			font-size: 15px;
			font-weight: 600;
			line-height: 22px;
		}
		
		.bottom {
			width: 95%;
			height: 12px;
			margin-top: 5px;
			position: relative;
			
			.avatar {
				position: absolute;
				width: 12px;
				height: 12px;
				border-radius: 50%;
				overflow: hidden;
				
				.avatar-img {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			
			.authorName {
				position: absolute;
				height: 12px;
				left: 17px;
				font-size: 12px;
				line-height: 12px;
			}
			
			.likes {
				display: flex;
				position: absolute;
				right: 5px;
				line-height: 12px;
				
				.likeNum {
					padding-left: 3px;
					font-size: 12px;
				}
			}
			
		}
		
	}
</style>