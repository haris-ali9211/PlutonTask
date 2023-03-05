import { ConnectButton } from "web3uikit";


export default function Header() {
    return (
        <>
            <div style={{display: "flex"}}>
                <div>
                    Pluton test
                </div>
                <div>
                    <ConnectButton moralisAuth={false} />
                </div>
            </div>
        </>
    )
}