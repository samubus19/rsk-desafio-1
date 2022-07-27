// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const deployToken = async () => {

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const oneMinuteinSecs           = 60;
  const unlockTime                = currentTimestampInSeconds + oneMinuteinSecs;

  const alice1                    = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
  const alice2                    = '0xD6a4BE579821fc6737360f0f921BAdFcFea55ACc'
  const signer                    = await hre.ethers.getSigner()
  const Qatar                     = await hre.ethers.getContractFactory('Qatar')
  const qatar                     = await Qatar.deploy(unlockTime)
  await qatar.deployed()

  try {
    await qatar.mintear(signer.address, 12)
    console.log("Balance despues de mintear: ",await qatar.balanceOf(signer.address))
    // await qatar.mintear(alice1, 5)
    // console.log("Balance de alice despues de mintear: ",await qatar.balanceOf(alice1))
  } catch (error) {
    console.log(error.message)    
  }

  //CAMBIAR UNLOCK TIME
  try {
    console.log("unlockTime antes de ser cambiado: ", await qatar.getUnlockTime())
    await qatar.cambiarUnlockTime(0, signer.address);
    console.log("unlockTime despues de ser cambiado: ", await qatar.getUnlockTime())
  } catch (error) {
    console.log(error.message)    
  }

  try {
    await qatar.mintear(signer.address, 12)
    console.log("Balance de owner antes de transferir",await qatar.balanceOf(signer.address))
  } catch (error) {
    console.log(error.message)    
  }

  /**
   * TRANSFERENCIAS DE TOKENS
   */
  // const tx = await qatar.transfer(
  //   alice1,
  //   hre.ethers.BigNumber.from("12")
  // )
  // tx.wait()

  // console.log("Balance de alice despues de transferir",await qatar.balanceOf(alice1))
  // console.log("Balance de owner despues de transferir",await qatar.balanceOf(signer.address))

/**
 * TRANSFERENCIAS DE VALOR
 */
  // const tx1 = await token.signer.sendTransaction({
  //   to: alice1,
  //   value: ethers.utils.parseEther('0.0205')
  // })
  // console.log('tx1', tx1)
  // const receipt1 = await tx1.wait()
  // console.log('receipt1', receipt1)
  // const balanceOfAlice1 = await hre.ethers.provider.getBalance(alice1)
  // console.log('balanceOfAlice1', formatBalance(balanceOfAlice1))
  
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployToken().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
