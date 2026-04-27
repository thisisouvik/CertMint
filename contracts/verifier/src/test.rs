#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String, Symbol};

// We need to import the NFTCertificateContract to use it in test.
use nft_certificate::{NFTCertificateContract, NFTCertificateContractClient};

#[test]
fn test_verify_success() {
    let env = Env::default();
    env.mock_all_auths();
    
    // 1. Deploy NFT Contract
    let nft_contract_id = env.register(NFTCertificateContract, ());
    let nft_client = NFTCertificateContractClient::new(&env, &nft_contract_id);
    
    let admin = Address::generate(&env);
    nft_client.initialize(&admin);
    
    let owner = Address::generate(&env);
    let token_id = 1;
    let cert_type = Symbol::new(&env, "cert");
    let title = String::from_str(&env, "Test Certificate");
    
    nft_client.mint(&owner, &token_id, &cert_type, &title);
    
    // 2. Deploy Verifier Contract
    let verifier_contract_id = env.register(VerifierContract, ());
    let verifier_client = VerifierContractClient::new(&env, &verifier_contract_id);
    
    // 3. Verify
    let result = verifier_client.verify(&nft_contract_id, &token_id);
    
    assert!(result.is_valid);
    assert_eq!(result.token_id, token_id);
    assert_eq!(result.owner, owner);
    assert_eq!(result.issuer, owner);
    assert_eq!(result.cert_type, cert_type);
    assert_eq!(result.title, title);
}
