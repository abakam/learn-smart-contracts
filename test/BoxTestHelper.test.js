const { expect } = require("chai");
require("ethers");
// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert  } = require("@openzeppelin/test-helpers");
const { artifacts } = require("hardhat");
const { Contract } = require("ethers");
// Load compiled artifacts
const Box = artifacts.require("BoxWithOwnable");

// Start test lock
Contract('Box With Ownable using Test Helpers', function([owner, other]){
    // Use large integers ('big numbers')
    const value = new BN('42');

    

    this.beforeEach(async function() {
        this.box = await Box.new({ from: owner });
    });

    it('retrieve returns a previously stored value', async function() {
        // Store value
        await this.box.store(value, { from: owner });

        // Use large integer comparisons
        expect((await this.box.retrieve()).toString()).to.be.bignumber.equal(value);
    });

    it('store emits an event', async function() {
        const receipt = await this.box.store(value, { from: owner });

        // Test that a ValueChanged event was emitted with the new value
        expectEvent(receipt, 'ValueChanged', { value: value });
    });

    it('non owner cannot store a value', async function() {
        // Test a transaction reverts
        await expectRevert(
            this.box.store(value, { from: other }),
            'Ownable: caller is not the owner'
        );
    });
});