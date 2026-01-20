# D-Box Startup Guide

Since you are running a local blockchain, nothing is saved permanently when you turn off your computer. You must follow these steps **every time** you want to work on or use the project.

## 1. Start the Local Blockchain
Open your first terminal and run:
```bash
npx hardhat node
```
*Critically: Keep this terminal OPEN and RUNNING.*

## 2. Deploy the Smart Contract
Open a **New Terminal** (Terminal 2) and run:
```bash
npx hardhat run scripts/deploy.js --network localhost
```
**Important Check:**
- Look at the output: `Library deployed to: 0x...`
- Go to `client/src/App.js` (Line 33) and verify the `contractAddress` matches this new address.
- *If they match:* Good.
- *If they are different:* Update `App.js` with the new address and save.

## 3. Reset MetaMask (CRITICAL STEP)
Because you restarted the blockchain, MetaMask's history is now invalid. You **must** reset it to avoid "Nonce" or "Insufficient Funds" errors.
1. Open MetaMask extension.
2. Click your **Profile Icon** (top right) -> **Settings** -> **Advanced**.
3. Click **Clear activity tab data** (or "Reset Account").
4. Click **Clear**.

*Note: This does not delete your wallet, only the glitched transaction history.*

## 4. Start the React App
In your **Terminal 2**, run:
```bash
cd client
npm start
```
(If it says "Something is already running on port 3000", verify if you have another terminal open, or say 'yes' to use another port).

## 5. Connect & Upload
1. Go to `http://localhost:3000`.
2. Ensure MetaMask is connected to your **Localhost** network (Chain ID 1337 or 31337).
3. You should see your 10,000 ETH balance.
4. Upload your files!
