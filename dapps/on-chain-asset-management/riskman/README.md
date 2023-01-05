## On Chain Asset Management on SUI

### Set up your asset management application 
First step, you have to publish the smart contract:
```sh
  sui client publish --gas-budget 30000
```
With the publication, an administrator capability is created and transfered to the publisher, and a  foundation_balance and roles registry is created and shared. It's a good practice to save those addresses:
```sh
  package = "<ID>"
  admincap = "<ID>"
  balance = "<ID>"
  registry = "<ID>"
```
Next step, administrator has to assign roles to foundation members. Create_spender function transfers to someone the spender capability and specifies the policy thresholds. Create_approver function transfers to someone the approver capability:
```sh
  sui client call --package $package --module policy_config --function create_spender --args $admincap $registry <Spender_Address> 10000 10 --gas-budget 30000 
  spendercap = "<ID>"
  sui client call --package $package --module policy_config --function create_approver --args $admincap $registry <Approver_Address> --gas-budget 30000
  approvercap = "<ID>"
```
Last step, top up your foundation balance:
```sh
  sui client call --package $package --module policy_config --function top_up --args $balance <Coin_ID> --gas-budget 30000
```

### Transaction Flow
![tflow](https://github.com/MystenLabs/sui/blob/On-Chain-Asset-Management/dapps/on-chain-asset-management/riskman/Transaction-flow.drawio.png)
