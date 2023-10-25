import React, { Component } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Navigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import {borrowYourCarContract, web3} from "../utils/contracts";

import {
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBInputGroup
}
  from 'mdb-react-ui-kit';

import Footer from '../components/Footer';
import InfoTable from '../components/InfoTable';
import Header from '../components/Header';

const GanacheTestChainId = '0x539' // Ganache默认的ChainId = 0x539 = Hex(1337)
// TODO change according to your configuration
const GanacheTestChainName = 'Ganache Test Chain'
const GanacheTestChainRpcUrl = 'http://127.0.0.1:8545'

const CheckMain = () => {

  const [account, setAccount] = useState('')
  const [managerAccount, setManagerAccount] = useState('')
  const [queryOutput, setQueryOutput] = useState('')
  const [queryCarId, setQueryCarId] = useState('')
  //保存用户拥有的车辆
  const [ownedCars, setOwnedCars] = useState<Car[]>([])
  const [ownedCarsOwners, setOwnedCarsOwners] = useState<any[]>([])
  const [ownedCarsBorrowers, setOwnedCarsBorrowers] = useState<any[]>([])
  //保存当前空闲的车辆
  const [availableCars, setAvailableCars] = useState<Car[]>([])
  const [availableCarsOwners, setAvailableCarsOwners] = useState<any[]>([])
  const [availableCarsBorrowers, setAvailableCarsBorrowers] = useState<any[]>([])
  //车辆信息结构体
  class Car {
      constructor(public tokenId: number) {}
  }

  useEffect(() => {
    // 初始化检查用户是否已经连接钱包
    // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
    const initCheckAccounts = async () => {
        // @ts-ignore
        const {ethereum} = window;
        if (Boolean(ethereum && ethereum.isMetaMask)) {
            // 尝试获取连接的用户账户
            const accounts = await web3.eth.getAccounts()
            if(accounts && accounts.length) {
                setAccount(accounts[0])
            }
        }
    }

    initCheckAccounts()
  }, [])

  const onClickConnectWallet = async () => {
    // 查看window对象里是否存在ethereum（metamask安装后注入的）对象
    // @ts-ignore
    const {ethereum} = window;
    if (!Boolean(ethereum && ethereum.isMetaMask)) {
        alert('MetaMask is not installed!');
        return
    }

    try {
        // 如果当前小狐狸不在本地链上，切换Metamask到本地测试链
        if (ethereum.chainId !== GanacheTestChainId) {
            const chain = {
                chainId: GanacheTestChainId, // Chain-ID
                chainName: GanacheTestChainName, // Chain-Name
                rpcUrls: [GanacheTestChainRpcUrl], // RPC-URL
            };

            try {
                // 尝试切换到本地网络
                await ethereum.request({method: "wallet_switchEthereumChain", params: [{chainId: chain.chainId}]})
            } catch (switchError: any) {
                // 如果本地网络没有添加到Metamask中，添加该网络
                if (switchError.code === 4902) {
                    await ethereum.request({ method: 'wallet_addEthereumChain', params: [chain]
                    });
                }
            }
        }

        // 小狐狸成功切换网络了，接下来让小狐狸请求用户的授权
        await ethereum.request({method: 'eth_requestAccounts'});
        // 获取小狐狸拿到的授权用户列表
        const accounts = await ethereum.request({method: 'eth_accounts'});
        // 如果用户存在，展示其account，否则显示错误信息
        setAccount(accounts[0] || 'Not able to get accounts');
    } catch (error: any) {
        alert(error.message)
    }
  }

  useEffect(() => {
    const getborrowYourCarContractInfo = async () => {
        if (borrowYourCarContract) {
            const ma = await borrowYourCarContract.methods.manager().call()
            setManagerAccount(ma)
        } else {
            alert('Contract not exists.')
        }
    }

    getborrowYourCarContractInfo()
  }, [account])

  useEffect(() => {
    const getAvailableCarsInfo = async () => {
        if (borrowYourCarContract) {
          let availableCars = await borrowYourCarContract.methods.getAvailableCars().call({
            from: account
          })
          console.log("available:" + availableCars)          
          setAvailableCars(availableCars)

          let owners = []
          let borrowers = []
          for(var i = 0; i < availableCars.length; i++){
            let owner = await borrowYourCarContract.methods.getOwner(availableCars[i]).call()
            owners.push(owner)
            let borrower = await borrowYourCarContract.methods.getBorrower(availableCars[i]).call()
            borrowers.push(borrower)
          }
          setAvailableCarsOwners(owners)
          setAvailableCarsBorrowers(borrowers)
        } else {
            alert('Contract not exists.')
        }
    }

    getAvailableCarsInfo()
  }, [account])

  useEffect(() => {
    const getOwnedCarsInfo = async () => {
        if (borrowYourCarContract) {
            let ownedCars = await borrowYourCarContract.methods.getOwnedCars().call({
              from: account
            })
            console.log("owned:" + ownedCars)
            setOwnedCars(ownedCars)
            let owners = []
            let borrowers = []
            for(var i = 0; i < ownedCars.length; i++){
              let owner = await borrowYourCarContract.methods.getOwner(ownedCars[i]).call()
              owners.push(owner)
              let borrower = await borrowYourCarContract.methods.getBorrower(ownedCars[i]).call()
              borrowers.push(borrower)
            }
            setOwnedCarsOwners(owners)
            setOwnedCarsBorrowers(borrowers)
        } else {
            alert('Contract not exists.')
        }
    }

    getOwnedCarsInfo()
  }, [account])

  const handleGetAvailableCarsClick = async() => {
      if(borrowYourCarContract){
        let availableCars = await borrowYourCarContract.methods.getAvailableCars().call({
          from: account
        })
        console.log("available:" + availableCars)
        setAvailableCars(availableCars)
      } else {
        alert('Contract not exists.')
      }
  }

  const handleGetOwnedCarsClick = async() => {
    if(borrowYourCarContract){
      let ownedCars = await borrowYourCarContract.methods.getOwnedCars().call({
        from: account
      })
      console.log("owned:" + ownedCars)
      setOwnedCars(ownedCars)
    } else {
      alert('Contract not exists.')
    }
  }

  const handleGetNewCar = async() => {
    if(borrowYourCarContract){
      const token = await borrowYourCarContract.methods.issueCar().send({
        from: account
      })
    } else {
      alert('Contract not exists.')
    }
  }

  const handleQueryCar = async () => {

    if(account === '') {
        alert('Not connect to wallet yet.')
        return
    }

    if (borrowYourCarContract) {
      console.log("query:"+queryCarId)
        try {
            //查询车辆信息
            const owner =  await borrowYourCarContract.methods.getOwner(queryCarId).call()
            console.log("owner:"+owner)
            const borrower =  await borrowYourCarContract.methods.getBorrower(queryCarId).call()
            console.log("borrower"+borrower)
            //输出查询结果
            if(owner === '0x0000000000000000000000000000000000000000'){
              setQueryOutput("该车辆不存在,请检查输入的车辆ID是否正确")
            }
            else if(borrower === '0x0000000000000000000000000000000000000000'){
              setQueryOutput("\nOwner：" + owner + "\nBorrower：none")
            }
            else{
              setQueryOutput("\nOwner：" + owner + "\nBorrower：" + borrower)
            }
        } catch (error: any) {
            alert(error.message)
        }

    } else {
        alert('No contract exists.')
    }
}

  return (
    <div>
      <Header />
      <MDBContainer className="my-5">
        <div>
          <MDBInputGroup  className='d-flex w-auto mb-3'>
            <div className='account'>
              {account === '' && <MDBBtn onClick={onClickConnectWallet}>连接钱包</MDBBtn>}
              <div>当前用户：{account === '' ? '无用户连接' : account}</div>
            
              <MDBBtn onClick={handleGetAvailableCarsClick}>刷新可借汽车列表</MDBBtn>
              <InfoTable nums={availableCars} owners={availableCarsOwners} borrowers={availableCarsBorrowers} account={account} />
              
              <MDBBtn onClick={handleGetOwnedCarsClick}>刷新拥有汽车列表</MDBBtn>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <MDBBtn onClick={handleGetNewCar}>申请新车辆</MDBBtn>
              <InfoTable nums={ownedCars} owners={ownedCarsOwners} borrowers={ownedCarsBorrowers} account={account} />

              <div>车辆ID：</div>
              <MDBInput type="number" style={{marginRight: '20px'}} value={queryCarId} onChange={e => setQueryCarId(e.target.value)} />
              <br/>
              <MDBBtn style={{width: '200px'}} onClick={handleQueryCar}>查询车辆</MDBBtn>
              <br/>
              <br/>
              <div style={{whiteSpace: 'pre-wrap'}}>查询结果：{queryOutput}</div>
            </div>
            <div style={{ marginRight: '20px' }}></div>
          </MDBInputGroup>
        </div>
        <Footer />
      </MDBContainer>
    </div>
  )
}

export default CheckMain