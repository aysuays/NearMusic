## Setting up your terminal

The scripts in this folder support a simple demonstration of the contract.

It uses the following setup:

### Terminal

*This window is used to compile, deploy and control the contract*
- Environment
  ```sh
  export CONTRACT=        # depends on deployment
  export OWNER=           # any account you control and create, add songs and subscription types
  export USER=            # any account buy subscription to listen songs


  # for example
  # export CONTRACT=dev-1650345345591-4501142324234
  # export OWNER=aysug.testnet
  # export USER=sub1.aysug.testnet

  ```

- Commands

  _Owner scripts_
  ```sh
  1.dev-deploy.sh           # cleanup, compile and deploy contract
  2.create-subaccounts.sh   # generate a summary report of the contract state
  3.adminRole.sh       
  6.report.sh
  ```

  _Public scripts_
  ```sh
  4.userRole.sh         
  5.playSong.sh    
  ```