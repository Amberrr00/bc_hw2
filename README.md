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

简单描述：项目完成了要求的哪些功能？每个功能具体是如何实现的？<br>

1、查看可用车辆<br>
   数据更新时自动刷新/点击“刷新可借车辆列表”按钮，<br>
   -前端调用getAvailableCars()方法向后端请求可用车辆的token<br>
   -后端返回token数组<br>
   -前端根据token调用getOwner()、getBorrower()方法逐一请求车辆具体信息<br>
   -后端返回相应车辆具体信息<br>
   -前端在列表中显示车辆序号、拥有者、借用者以及是否可借用等信息<br>
   <br>
2、查看拥有车辆<br>
   数据更新时自动刷新/点击“刷新拥有车辆列表”按钮，<br>
   -前端调用getOwnedCars()向后端请求拥有车辆的token<br>
   -后端返回token数组<br>
   -前端根据token调用getOwner()、getBorrower()方法逐一请求车辆具体信息<br>
   -后端返回相应车辆具体信息<br>
   -前端在列表中显示车辆序号、拥有者、借用者以及是否可借用等信息<br>
   <br>
3、查询具体车辆的拥有者和借用者<br>
   输入想查询的车辆序号并点击“查询车辆按钮”，<br>
   -前端根据传入token调用getOwner()、getBorrower()方法逐一请求车辆具体信息<br>
   -后端返回相应车辆具体信息<br>
   -前端显示车辆（如果存在）拥有者和借用者（如果有）<br>
   <br>
4、申请获得新车辆<br>
   点击“申请新车辆按钮”<br>
   -前端调用issueCar()方法向后端请求<br>
   -后端根据消息发送地址分配新token<br>
   <br>
5、以固定时间借用一辆车<br>
   点击任一列表中某辆车的“borrow”按钮<br>
   -前端调用borrowCar()方法向后端请求固定时长的借用<br>
   -后端判断是否可借用并修改相应信息<br>
   <br>
## 项目运行截图

项目运行成功的关键页面和流程截图。主要包括操作流程以及和区块链交互的截图。<br>

1、连接钱包<br>
<img width="1280" alt="image" src="https://github.com/Amberrr00/bc_hw2/assets/100553258/c23546c8-4e7f-4143-9efa-fe1945041afc">
   -连接成功
<img width="1242" alt="image" src="https://github.com/Amberrr00/bc_hw2/assets/100553258/c8206c66-6011-45e9-87b6-1e4e4a90256d">
<br>
2、获取可借车辆列表<br>
   -默认显示，点击按钮可刷新
<img width="1265" alt="image" src="https://github.com/Amberrr00/bc_hw2/assets/100553258/43085745-dc47-44fe-a2ee-9f47dd32a952">
<br>
3、获得拥有车辆列表<br>
   -默认显示，点击按钮可刷新
<img width="1209" alt="image" src="https://github.com/Amberrr00/bc_hw2/assets/100553258/2a6675b4-41bf-4fae-a92c-a91eca3f9d83">
<br>
4、申请新车辆<br>
   -点击按钮申请
<img width="1280" alt="image" src="https://github.com/Amberrr00/bc_hw2/assets/100553258/2a58ef28-2832-4f68-958e-76648b74d9ed">
   -手动刷新页面（只按按钮显示的新获得车辆的信息有误，需要点击浏览器的刷新，可通过在前端添加强制刷新页面解决（但懒得改了）））
<img width="1263" alt="image" src="https://github.com/Amberrr00/bc_hw2/assets/100553258/9ea21275-d9e7-4a63-aa07-7dd16cde2b6a">
   （不小心申请了两辆）
<br>
5、借用车辆<br>
   -点击按钮借用<br>
   （换了个账户）
<img width="1280" alt="image" src="https://github.com/Amberrr00/bc_hw2/assets/100553258/94e34fad-d2bf-43c7-842a-e330a6c6f2f8">
   -借用后<br>
   （不小心借了两次）
<img width="1279" alt="image" src="https://github.com/Amberrr00/bc_hw2/assets/100553258/3d65b8a8-7079-4997-b722-537d69ce1edd">
<br>
6、查询车辆<br>
   -输入车辆序号查询<br>
   -可借用车辆
   <img width="1250" alt="image" src="https://github.com/Amberrr00/bc_hw2/assets/100553258/bc7414b9-57e2-4e5e-9966-3acd26542a64">
   -已借用车辆
   <img width="1205" alt="image" src="https://github.com/Amberrr00/bc_hw2/assets/100553258/50dd0d6e-ee0b-4a90-851c-a82a92cf1f3e">
   -不存在车辆
   <img width="1238" alt="image" src="https://github.com/Amberrr00/bc_hw2/assets/100553258/ac20dbb6-dd91-4f30-8f74-50b339030deb"> 
<br>
## 参考内容

- 课程的参考Demo见：[DEMOs](https://github.com/LBruyne/blockchain-course-demos)。

- ERC-4907 [参考实现](https://eips.ethereum.org/EIPS/eip-4907)

如果有其它参考的内容，也请在这里陈列。
