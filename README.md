# carBorrow

> 简易汽车借用系统，参与方包括：汽车拥有者，有借用汽车需求的用户
>
> 背景：ERC-4907 基于 ERC-721 做了简单的优化和补充，允许用户对NFT进行租借。
> - 创建一个合约，在合约中发行NFT集合，每个NFT代表一辆汽车。给部分用户测试领取部分汽车NFT，用于后面的测试。
> - 在网站中，默认每个用户的汽车都可以被借用。每个用户可以： 
>    1. 查看自己拥有的汽车列表。查看当前还没有被借用的汽车列表。
>    2. 查询一辆汽车的主人，以及该汽车当前的借用者（如果有）。
>    3. 选择并借用某辆还没有被借用的汽车一定时间(时间不可更改)。
>    4. 上述过程中借用不需要进行付费。
> 
> （已实现）使用自己发行的积分（ERC20）完成付费租赁汽车的流程

作业提交方式为：**提交视频文件**和**仓库的链接**到指定邮箱。

## 如何运行

补充如何完整运行你的应用。

1. 在本地启动ganache应用。

2. 在 `./contracts` 中安装需要的依赖，运行如下的命令：
    ```bash
    npm install
    ```
3. 在 `./contracts` 中编译合约，运行如下的命令：
    ```bash
    npx hardhat compile
    ```
4. 在 `./contracts/hardhat.config` 中配置账户私钥
5. 在 `./contracts` 中部署合约，运行如下的命令：
   ```bash
   npx hardhat run scripts/deploy.ts --network ganache
6. 在 `./frontend/src/utils/contract-addresses.json` 中修改合约地址至部署地址
7. 在 `./frontend` 中安装需要的依赖，运行如下的命令：
    ```bash
    npm install
    ```
8. 在 `./frontend` 中启动前端程序，运行如下的命令：
    ```bash
    npm run start
    ```

## 功能实现分析

简单描述：项目完成了要求的哪些功能？每个功能具体是如何实现的？</br>

1、查看可用车辆</br>
   数据更新时自动刷新/点击“刷新可借车辆列表”按钮，</br>
   -前端调用getAvailableCars()方法向后端请求可用车辆的token</br>
   -后端返回token数组</br>
   -前端根据token调用getOwner()、getBorrower()方法逐一请求车辆具体信息</br>
   -后端返回相应车辆具体信息</br>
   -前端在列表中显示车辆序号、拥有者、借用者以及是否可借用等信息</br>
   </br>
2、查看拥有车辆</br>
   数据更新时自动刷新/点击“刷新拥有车辆列表”按钮，</br>
   -前端调用getOwnedCars()向后端请求拥有车辆的token</br>
   -后端返回token数组</br>
   -前端根据token调用getOwner()、getBorrower()方法逐一请求车辆具体信息</br>
   -后端返回相应车辆具体信息</br>
   -前端在列表中显示车辆序号、拥有者、借用者以及是否可借用等信息</br>
   </br>
3、查询具体车辆的拥有者和借用者</br>
   输入想查询的车辆序号并点击“查询车辆按钮”，</br>
   -前端根据传入token调用getOwner()、getBorrower()方法逐一请求车辆具体信息</br>
   -后端返回相应车辆具体信息</br>
   -前端显示车辆（如果存在）拥有者和借用者（如果有）</br>
   </br>
4、申请获得新车辆</br>
   点击“申请新车辆按钮”</br>
   -前端调用issueCar()方法向后端请求</br>
   -后端根据消息发送地址分配新token</br>
   </br>
5、以固定时间借用一辆车</br>
   点击任一列表中某辆车的“borrow”按钮</br>
   -前端调用borrowCar()方法向后端请求固定时长的借用</br>
   -后端判断是否可借用并修改相应信息</br>
   </br>
## 项目运行截图

项目运行成功的关键页面和流程截图。主要包括操作流程以及和区块链交互的截图。</br>

1、连接钱包
<img width="1280" alt="image" src="https://github.com/Amberrr00/bc_hw2/assets/100553258/c23546c8-4e7f-4143-9efa-fe1945041afc">



## 参考内容

- 课程的参考Demo见：[DEMOs](https://github.com/LBruyne/blockchain-course-demos)。

- ERC-4907 [参考实现](https://eips.ethereum.org/EIPS/eip-4907)

如果有其它参考的内容，也请在这里陈列。
