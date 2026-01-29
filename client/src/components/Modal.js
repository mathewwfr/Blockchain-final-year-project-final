import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const [shareAddress, setShareAddress] = useState("");
  const [accessList, setAccessList] = useState([]);

  const sharing = async () => {
    try {
      if (!shareAddress) return;
      await contract.allow(shareAddress);
      setModalOpen(false);
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Error sharing access");
    }
  };

  const revoke = async (address) => {
    try {
      const tx = await contract.disallow(address);
      await tx.wait();
      const addressList = await contract.shareAccess();
      setAccessList(addressList);
    } catch (error) {
      console.error("Error revoking access:", error);
      alert("Error revoking access");
    }
  };

  useEffect(() => {
    const accessListFn = async () => {
      const addressList = await contract.shareAccess();
      setAccessList(addressList);
    };
    contract && accessListFn();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
              value={shareAddress}
              onChange={(e) => setShareAddress(e.target.value)}
            ></input>
          </div>

          <div className="access-list">
            <h3>People With Access</h3>
            <div className="list-container">
              {accessList.length > 0 ? (
                accessList.map((item, index) => (
                  <div className="access-item" key={index}>
                    <span className="user-address">
                      {item.user.substring(0, 15)}...{item.user.substring(38)}
                    </span>
                    <span className={`status ${item.access ? "approved" : "rejected"}`}>
                      {item.access ? "Access" : "Revoked"}
                    </span>
                    {item.access && (
                      <button
                        className="revoke-btn"
                        onClick={() => revoke(item.user)}
                        title="Revoke Access"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="#ff5050" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-access">No shared access yet</p>
              )}
            </div>
          </div>

          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
