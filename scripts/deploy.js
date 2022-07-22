// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const formatBalance = (bn) => hre.ethers.utils.formatEther(bn) + ' RBTC'

const deployToken = async () => {
  const tokenFactory = await hre.ethers.getContractFactory('Qatar')
  const token = await tokenFactory.deploy()
  await token.deployed()
  console.log("Token address: ", token.address)

  // const [signer] = await hre.ethers.getSigners()
  // const balanceOfSigner = await signer.getBalance()
  // console.log('balanceOfSigner', formatBalance(balanceOfSigner))
  // const balanceOfToken = await hre.ethers.provider.getBalance(token.signer.getAddress())
  // console.log('balanceOfToken', formatBalance(balanceOfToken))


  const alice1 = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
  const alice2 = '0xD6a4BE579821fc6737360f0f921BAdFcFea55ACc'
  const alice3 = '0xa54d3c09E34aC96807c1CC397404bF2B98DC4eFb'

  const tx1 = await token.signer.sendTransaction({
    to: alice1,
    value: ethers.utils.parseEther('0.0205')
  })
  console.log('tx1', tx1)

  const receipt1 = await tx1.wait()
  console.log('receipt1', receipt1)

  const tx2 = await token.signer.sendTransaction({
    to: alice2,
    value: ethers.utils.parseEther('0.0005')
  })
  console.log('tx2', tx2)

  const receipt2 = await tx2.wait()
  console.log('receipt2', receipt2)

  const tx3 = await token.signer.sendTransaction({
    to: alice3,
    value: ethers.utils.parseEther('0.4005')
  })
  console.log('tx3', tx3)

  const receipt3 = await tx3.wait()
  console.log('receipt3', receipt3)

  const balanceOfAlice1 = await hre.ethers.provider.getBalance(alice1)
  console.log('balanceOfAlice1', formatBalance(balanceOfAlice1))
  const balanceOfAlice2 = await hre.ethers.provider.getBalance(alice2)
  console.log('balanceOfAlice2', formatBalance(balanceOfAlice2))
  const balanceOfAlice3 = await hre.ethers.provider.getBalance(alice3)
  console.log('balanceOfAlice3', formatBalance(balanceOfAlice3))




  return token
}


deployToken().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});