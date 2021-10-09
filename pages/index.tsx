import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import ClipLoader from 'react-spinners/ClipLoader';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Container from 'components/Container';
import Button from 'components/Button';
import PriceInput from 'components/PriceInput';
import Modal from 'components/Modal';

import * as Styled from '../styled';

import * as Web3 from 'web3';
import { OpenSeaPort, Network, EventType } from 'opensea-js';
import WalletConnectProvider from '@walletconnect/web3-provider';

import getToken from '../utils/get-token';

// TODO: Use web3modal

const NETWORK = process.env.NODE_ENV === 'production' ? 'Main' : 'Rinkeby';

const chainId = NETWORK === 'Rinkeby' ? 4 : 1;

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
  chainId,
  infuraId: process.env.NEXT_PUBLIC_INFURA,
  qrcodeModalOptions: {
    mobileLinks: ['rainbow', 'metamask'],
  },
});

const seaport = new OpenSeaPort(provider, {
  networkName: Network[NETWORK],
});

const Home: NextPage = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [price, setPrice] = useState<number | string>(0.01);
  const [token, setToken] = useState<any>({
    imageUrl:
      'https://lh3.googleusercontent.com/IBIMry_Ota1i1LJ5vWR3HDJhO6e7bqsmKY45uQaPTXamR9oDGLDnEFKRXWDG624EJkfHW8XjeRP9HPbz5yOQ0A8j4u-KW55o8Fk2=w600',
  });
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [acceptPurchaseModalOpen, setAcceptPurchaseModalOpen] =
    useState<boolean>(false);

  const [purchaseCompleteModalOpen, setPurchaseCompleteModalOpen] =
    useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  const closePurchaseCompleteModal = () => setPurchaseCompleteModalOpen(false);

  useEffect(() => {
    (async () => {
      // @ts-ignore
      if (provider.connector._connected) {
        const res = await provider.enable();
        setConnected(true);
        setWalletAddress(res[0]);
      }
    })();

    provider.on('disconnect', (code: number, reason: string) => {
      console.log(code, reason);
      setConnected(false);
    });
    provider.on('connect', () => {
      setConnected(true);
    });

    seaport.addListener(
      EventType.TransactionCreated,
      ({ transactionHash, event }) => {
        console.info({ transactionHash, event });
      }
    );
    seaport.addListener(
      EventType.TransactionConfirmed,
      ({ transactionHash, event }) => {
        console.info({ transactionHash, event });
        // Only reset your exchange UI if we're finishing an order fulfillment or cancellation
        if (event == EventType.MatchOrders || event == EventType.CancelOrder) {
          setLoading(false);
          setAcceptPurchaseModalOpen(false);
          setPurchaseCompleteModalOpen(true);
        }
      }
    );

    seaport.addListener(
      EventType.TransactionDenied,
      ({ transactionHash, event }) => {
        console.info({ transactionHash, event });
        // dispatch({ type: ActionTypes.RESET_EXCHANGE });
      }
    );
    seaport.addListener(
      EventType.TransactionFailed,
      ({ transactionHash, event }) => {
        console.info({ transactionHash, event });
        // dispatch({ type: ActionTypes.RESET_EXCHANGE });
      }
    );
  }, []);

  const connectWallet = async () => {
    try {
      const res = await provider.enable();
      setWalletAddress(res[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await provider.disconnect();
      setWalletAddress('');
    } catch (error) {
      console.log(error);
    }
  };

  const buy = async () => {
    if (typeof price === 'string') {
      return;
    }
    setLoading(true);
    const { token, order } = await getToken(price);
    setToken(token.asset);
    try {
      setLoading(false);
      setAcceptPurchaseModalOpen(true);
      const transactionHash = await seaport.fulfillOrder({
        order,
        accountAddress: walletAddress,
      });
      setTransactionHash(transactionHash);
    } catch (error) {
      console.log(error);
      setAcceptPurchaseModalOpen(false);
    }
  };

  return (
    <div>
      <Head>
        <title>I&apos;m Feeling Lucky: NFTs</title>
        <meta name="description" content="Get a random NFT from OpenSea" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Header />

      <Container>
        {loading && (
          <Modal>
            <>
              <Styled.Center>
                <ClipLoader
                  // color={color}
                  loading
                  size={150}
                />
              </Styled.Center>
            </>
          </Modal>
        )}
        {!connected && (
          <>
            <Styled.Emphasis>What is This?</Styled.Emphasis>
            <Styled.Text>Remember “I’m Feeling Lucky” from Google?</Styled.Text>
            <Styled.Text>Well this is the same thing but for NFT’s</Styled.Text>
            <Styled.Text>
              Connect your wallet, type in how much ETH you’re willing to spend
              and you’ll recieve a random NFT from OpenSea
            </Styled.Text>
          </>
        )}
        {!connected && (
          <div
            style={{
              marginTop: 'auto',
              marginBottom: 'auto',
              alignSelf: 'center',
            }}
          >
            <Button text={'Connect Wallet'} onClick={connectWallet} />
          </div>
        )}
        {connected && (
          <>
            {acceptPurchaseModalOpen && (
              <Modal>
                <>
                  <Styled.Title>Accept Purchase On Your Wallet</Styled.Title>
                  <Styled.Center>
                    <ClipLoader
                      // color={color}
                      loading
                      size={150}
                    />
                  </Styled.Center>
                </>
              </Modal>
            )}
            {purchaseCompleteModalOpen && (
              <Modal close={closePurchaseCompleteModal}>
                <>
                  <Styled.Title>Congrats 🥳</Styled.Title>
                  <Styled.Img src={token?.imageUrl} />
                  <p>
                    <Styled.Link
                      href={`https://${
                        NETWORK === 'Rinkeby' ? 'rinkeby' : 'www'
                      }.etherscan.io/tx/${transactionHash}`}
                      target="_blank"
                    >
                      Transaction Hash
                    </Styled.Link>
                  </p>
                  <p>
                    <Styled.Link
                      href={`https://${
                        NETWORK === 'Rinkeby' ? 'testnets' : 'www'
                      }.opensea.io/assets/${token.assetContract.address}/${
                        token.tokenId
                      }`}
                      target="_blank"
                    >
                      View on OpenSea
                    </Styled.Link>
                  </p>
                </>
              </Modal>
            )}

            <Styled.Text>
              1. Type in how much ETH you’re willing to spend
            </Styled.Text>
            <Styled.Text>2. Press I&apos;m Feeling Lucky!</Styled.Text>
            <Styled.Text>3. Enjoy your new random NFT :)</Styled.Text>
            <Styled.Center
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
            >
              <Styled.PriceValue>{price}</Styled.PriceValue>
              <Button onClick={buy} text={"I'm Feeling Lucky"} />
              <PriceInput value={price} onChange={(value) => setPrice(value)} />
            </Styled.Center>
          </>
        )}

        {/* <h1>{connected ? 'Connected' : 'Not Connected'}</h1>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button onClick={buy}>Buy the ting</button>
        <img src={token?.imageUrl} />
        {token && (
          <p>
            Price:{' '}
            {parseFloat(
              Web3.utils.fromWei(
                token.orderData.bestAsk.paymentAssetQuantity.quantity,
                'ether'
              ),
              10
            )}
          </p>
        )} */}
      </Container>
      <Footer disconnect={connected ? disconnectWallet : null} />
    </div>
  );
};

export default Home;
