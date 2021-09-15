---
description: >-
  Solidity is an object-oriented, high-level language for implementing smart
  contracts. Smart contracts are programs which govern the behaviour of accounts
  within the Ethereum state.
---

# Solidity

## IDE \(to practice with\)

{% embed url="https://remix.ethereum.org/\#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.7+commit.e28d00a7.js" %}



## Solidity

![](https://docs.soliditylang.org/en/v0.8.7/_images/logo.svg)

Solidity is an object-oriented, high-level language for implementing smart contracts. Smart contracts are programs which govern the behaviour of accounts within the Ethereum state.

Solidity is a [curly-bracket language](https://en.wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages). It is influenced by C++, Python and JavaScript, and is designed to target the Ethereum Virtual Machine \(EVM\). You can find more details about which languages Solidity has been inspired by in the [language influences](https://docs.soliditylang.org/en/v0.8.7/language-influences.html) section.

Solidity is statically typed, supports inheritance, libraries and complex user-defined types among other features.

With Solidity you can create contracts for uses such as voting, crowdfunding, blind auctions, and multi-signature wallets.

When deploying contracts, you should use the latest released version of Solidity. This is because breaking changes as well as new features and bug fixes are introduced regularly. We currently use a 0.x version number [to indicate this fast pace of change](https://semver.org/#spec-item-4).

Warning

Solidity recently released the 0.8.x version that introduced a lot of breaking changes. Make sure you read [the full list](https://docs.soliditylang.org/en/v0.8.7/080-breaking-changes.html).

Ideas for improving Solidity or this documentation are always welcome, read our [contributors guide](https://docs.soliditylang.org/en/v0.8.7/contributing.html) for more details.

### Getting Started

**1. Understand the Smart Contract Basics**

If you are new to the concept of smart contracts we recommend you to get started by digging into the “Introduction to Smart Contracts” section, which covers:

* [A simple example smart contract](https://docs.soliditylang.org/en/v0.8.7/introduction-to-smart-contracts.html#simple-smart-contract) written in Solidity.
* [Blockchain Basics](https://docs.soliditylang.org/en/v0.8.7/introduction-to-smart-contracts.html#blockchain-basics).
* [The Ethereum Virtual Machine](https://docs.soliditylang.org/en/v0.8.7/introduction-to-smart-contracts.html#the-ethereum-virtual-machine).

**2. Get to Know Solidity**

Once you are accustomed to the basics, we recommend you read the [“Solidity by Example”](https://docs.soliditylang.org/en/v0.8.7/solidity-by-example.html) and “Language Description” sections to understand the core concepts of the language.

**3. Install the Solidity Compiler**

There are various ways to install the Solidity compiler, simply choose your preferred option and follow the steps outlined on the [installation page](https://docs.soliditylang.org/en/v0.8.7/installing-solidity.html#installing-solidity).

Hint

You can try out code examples directly in your browser with the [Remix IDE](https://remix.ethereum.org/). Remix is a web browser based IDE that allows you to write, deploy and administer Solidity smart contracts, without the need to install Solidity locally.

W

As humans write software, it can have bugs. You should follow established software development best-practices when writing your smart contracts. This includes code review, testing, audits, and correctness proofs. Smart contract users are sometimes more confident with code than their authors, and blockchains and smart contracts have their own unique issues to watch out for, so before working on production code, make sure you read the [Security Considerations](https://docs.soliditylang.org/en/v0.8.7/security-considerations.html#security-considerations) section.

**4. Learn More**

If you want to learn more about building decentralized applications on Ethereum, the [Ethereum Developer Resources](https://ethereum.org/en/developers/) can help you with further general documentation around Ethereum, and a wide selection of tutorials, tools and development frameworks.

If you have any questions, you can try searching for answers or asking on the [Ethereum StackExchange](https://ethereum.stackexchange.com/), or our [Gitter channel](https://gitter.im/ethereum/solidity/).



## Contents



### Basics

* [Introduction to Smart Contracts](https://docs.soliditylang.org/en/v0.8.7/introduction-to-smart-contracts.html)
  * [A Simple Smart Contract](https://docs.soliditylang.org/en/v0.8.7/introduction-to-smart-contracts.html#a-simple-smart-contract)
  * [Blockchain Basics](https://docs.soliditylang.org/en/v0.8.7/introduction-to-smart-contracts.html#blockchain-basics)
  * [The Ethereum Virtual Machine](https://docs.soliditylang.org/en/v0.8.7/introduction-to-smart-contracts.html#index-6)
* [Installing the Solidity Compiler](https://docs.soliditylang.org/en/v0.8.7/installing-solidity.html)
  * [Versioning](https://docs.soliditylang.org/en/v0.8.7/installing-solidity.html#versioning)
  * [Remix](https://docs.soliditylang.org/en/v0.8.7/installing-solidity.html#remix)
  * [npm / Node.js](https://docs.soliditylang.org/en/v0.8.7/installing-solidity.html#npm-node-js)
  * [Docker](https://docs.soliditylang.org/en/v0.8.7/installing-solidity.html#docker)
  * [Linux Packages](https://docs.soliditylang.org/en/v0.8.7/installing-solidity.html#linux-packages)
  * [macOS Packages](https://docs.soliditylang.org/en/v0.8.7/installing-solidity.html#macos-packages)
  * [Static Binaries](https://docs.soliditylang.org/en/v0.8.7/installing-solidity.html#static-binaries)
  * [Building from Source](https://docs.soliditylang.org/en/v0.8.7/installing-solidity.html#building-from-source)
  * [CMake Options](https://docs.soliditylang.org/en/v0.8.7/installing-solidity.html#cmake-options)
  * [The Version String in Detail](https://docs.soliditylang.org/en/v0.8.7/installing-solidity.html#the-version-string-in-detail)
  * [Important Information About Versioning](https://docs.soliditylang.org/en/v0.8.7/installing-solidity.html#important-information-about-versioning)
* [Solidity by Example](https://docs.soliditylang.org/en/v0.8.7/solidity-by-example.html)
  * [Voting](https://docs.soliditylang.org/en/v0.8.7/solidity-by-example.html#voting)
  * [Blind Auction](https://docs.soliditylang.org/en/v0.8.7/solidity-by-example.html#blind-auction)
  * [Safe Remote Purchase](https://docs.soliditylang.org/en/v0.8.7/solidity-by-example.html#safe-remote-purchase)
  * [Micropayment Channel](https://docs.soliditylang.org/en/v0.8.7/solidity-by-example.html#micropayment-channel)
  * [Modular Contracts](https://docs.soliditylang.org/en/v0.8.7/solidity-by-example.html#modular-contracts)

Language Description

* [Layout of a Solidity Source File](https://docs.soliditylang.org/en/v0.8.7/layout-of-source-files.html)
  * [SPDX License Identifier](https://docs.soliditylang.org/en/v0.8.7/layout-of-source-files.html#spdx-license-identifier)
  * [Pragmas](https://docs.soliditylang.org/en/v0.8.7/layout-of-source-files.html#pragmas)
  * [Importing other Source Files](https://docs.soliditylang.org/en/v0.8.7/layout-of-source-files.html#importing-other-source-files)
  * [Comments](https://docs.soliditylang.org/en/v0.8.7/layout-of-source-files.html#comments)
* [Structure of a Contract](https://docs.soliditylang.org/en/v0.8.7/structure-of-a-contract.html)
  * [State Variables](https://docs.soliditylang.org/en/v0.8.7/structure-of-a-contract.html#state-variables)
  * [Functions](https://docs.soliditylang.org/en/v0.8.7/structure-of-a-contract.html#functions)
  * [Function Modifiers](https://docs.soliditylang.org/en/v0.8.7/structure-of-a-contract.html#function-modifiers)
  * [Events](https://docs.soliditylang.org/en/v0.8.7/structure-of-a-contract.html#events)
  * [Errors](https://docs.soliditylang.org/en/v0.8.7/structure-of-a-contract.html#errors)
  * [Struct Types](https://docs.soliditylang.org/en/v0.8.7/structure-of-a-contract.html#struct-types)
  * [Enum Types](https://docs.soliditylang.org/en/v0.8.7/structure-of-a-contract.html#enum-types)
* [Types](https://docs.soliditylang.org/en/v0.8.7/types.html)
  * [Value Types](https://docs.soliditylang.org/en/v0.8.7/types.html#value-types)
  * [Reference Types](https://docs.soliditylang.org/en/v0.8.7/types.html#reference-types)
  * [Mapping Types](https://docs.soliditylang.org/en/v0.8.7/types.html#mapping-types)
  * [Operators Involving LValues](https://docs.soliditylang.org/en/v0.8.7/types.html#operators-involving-lvalues)
  * [Conversions between Elementary Types](https://docs.soliditylang.org/en/v0.8.7/types.html#conversions-between-elementary-types)
  * [Conversions between Literals and Elementary Types](https://docs.soliditylang.org/en/v0.8.7/types.html#conversions-between-literals-and-elementary-types)
* [Units and Globally Available Variables](https://docs.soliditylang.org/en/v0.8.7/units-and-global-variables.html)
  * [Ether Units](https://docs.soliditylang.org/en/v0.8.7/units-and-global-variables.html#ether-units)
  * [Time Units](https://docs.soliditylang.org/en/v0.8.7/units-and-global-variables.html#time-units)
  * [Special Variables and Functions](https://docs.soliditylang.org/en/v0.8.7/units-and-global-variables.html#special-variables-and-functions)
* [Expressions and Control Structures](https://docs.soliditylang.org/en/v0.8.7/control-structures.html)
  * [Control Structures](https://docs.soliditylang.org/en/v0.8.7/control-structures.html#control-structures)
  * [Function Calls](https://docs.soliditylang.org/en/v0.8.7/control-structures.html#function-calls)
  * [Creating Contracts via `new`](https://docs.soliditylang.org/en/v0.8.7/control-structures.html#creating-contracts-via-new)
  * [Order of Evaluation of Expressions](https://docs.soliditylang.org/en/v0.8.7/control-structures.html#order-of-evaluation-of-expressions)
  * [Assignment](https://docs.soliditylang.org/en/v0.8.7/control-structures.html#assignment)
  * [Scoping and Declarations](https://docs.soliditylang.org/en/v0.8.7/control-structures.html#scoping-and-declarations)
  * [Checked or Unchecked Arithmetic](https://docs.soliditylang.org/en/v0.8.7/control-structures.html#checked-or-unchecked-arithmetic)
  * [Error handling: Assert, Require, Revert and Exceptions](https://docs.soliditylang.org/en/v0.8.7/control-structures.html#error-handling-assert-require-revert-and-exceptions)
* [Contracts](https://docs.soliditylang.org/en/v0.8.7/contracts.html)
  * [Creating Contracts](https://docs.soliditylang.org/en/v0.8.7/contracts.html#creating-contracts)
  * [Visibility and Getters](https://docs.soliditylang.org/en/v0.8.7/contracts.html#visibility-and-getters)
  * [Function Modifiers](https://docs.soliditylang.org/en/v0.8.7/contracts.html#function-modifiers)
  * [Constant and Immutable State Variables](https://docs.soliditylang.org/en/v0.8.7/contracts.html#constant-and-immutable-state-variables)
  * [Functions](https://docs.soliditylang.org/en/v0.8.7/contracts.html#functions)
  * [Events](https://docs.soliditylang.org/en/v0.8.7/contracts.html#events)
  * [Errors and the Revert Statement](https://docs.soliditylang.org/en/v0.8.7/contracts.html#errors-and-the-revert-statement)
  * [Inheritance](https://docs.soliditylang.org/en/v0.8.7/contracts.html#inheritance)
  * [Abstract Contracts](https://docs.soliditylang.org/en/v0.8.7/contracts.html#abstract-contracts)
  * [Interfaces](https://docs.soliditylang.org/en/v0.8.7/contracts.html#interfaces)
  * [Libraries](https://docs.soliditylang.org/en/v0.8.7/contracts.html#libraries)
  * [Using For](https://docs.soliditylang.org/en/v0.8.7/contracts.html#using-for)
* [Inline Assembly](https://docs.soliditylang.org/en/v0.8.7/assembly.html)
  * [Example](https://docs.soliditylang.org/en/v0.8.7/assembly.html#example)
  * [Access to External Variables, Functions and Libraries](https://docs.soliditylang.org/en/v0.8.7/assembly.html#access-to-external-variables-functions-and-libraries)
  * [Things to Avoid](https://docs.soliditylang.org/en/v0.8.7/assembly.html#things-to-avoid)
  * [Conventions in Solidity](https://docs.soliditylang.org/en/v0.8.7/assembly.html#conventions-in-solidity)
* [Cheatsheet](https://docs.soliditylang.org/en/v0.8.7/cheatsheet.html)
  * [Order of Precedence of Operators](https://docs.soliditylang.org/en/v0.8.7/cheatsheet.html#order-of-precedence-of-operators)
  * [Global Variables](https://docs.soliditylang.org/en/v0.8.7/cheatsheet.html#global-variables)
  * [Function Visibility Specifiers](https://docs.soliditylang.org/en/v0.8.7/cheatsheet.html#function-visibility-specifiers)
  * [Modifiers](https://docs.soliditylang.org/en/v0.8.7/cheatsheet.html#modifiers)
  * [Reserved Keywords](https://docs.soliditylang.org/en/v0.8.7/cheatsheet.html#reserved-keywords)
* [Language Grammar](https://docs.soliditylang.org/en/v0.8.7/grammar.html)

Compiler

* [Using the Compiler](https://docs.soliditylang.org/en/v0.8.7/using-the-compiler.html)
  * [Using the Commandline Compiler](https://docs.soliditylang.org/en/v0.8.7/using-the-compiler.html#using-the-commandline-compiler)
  * [Setting the EVM Version to Target](https://docs.soliditylang.org/en/v0.8.7/using-the-compiler.html#setting-the-evm-version-to-target)
  * [Compiler Input and Output JSON Description](https://docs.soliditylang.org/en/v0.8.7/using-the-compiler.html#compiler-input-and-output-json-description)
  * [Compiler Tools](https://docs.soliditylang.org/en/v0.8.7/using-the-compiler.html#compiler-tools)
* [Analysing the Compiler Output](https://docs.soliditylang.org/en/v0.8.7/analysing-compilation-output.html)

Internals

* [Layout of State Variables in Storage](https://docs.soliditylang.org/en/v0.8.7/internals/layout_in_storage.html)
  * [Mappings and Dynamic Arrays](https://docs.soliditylang.org/en/v0.8.7/internals/layout_in_storage.html#mappings-and-dynamic-arrays)
  * [JSON Output](https://docs.soliditylang.org/en/v0.8.7/internals/layout_in_storage.html#json-output)
* [Layout in Memory](https://docs.soliditylang.org/en/v0.8.7/internals/layout_in_memory.html)
  * [Differences to Layout in Storage](https://docs.soliditylang.org/en/v0.8.7/internals/layout_in_memory.html#differences-to-layout-in-storage)
* [Layout of Call Data](https://docs.soliditylang.org/en/v0.8.7/internals/layout_in_calldata.html)
* [Cleaning Up Variables](https://docs.soliditylang.org/en/v0.8.7/internals/variable_cleanup.html)
* [Source Mappings](https://docs.soliditylang.org/en/v0.8.7/internals/source_mappings.html)
* [The Optimizer](https://docs.soliditylang.org/en/v0.8.7/internals/optimizer.html)
  * [Benefits of Optimizing Solidity Code](https://docs.soliditylang.org/en/v0.8.7/internals/optimizer.html#benefits-of-optimizing-solidity-code)
  * [Differences between Optimized and Non-Optimized Code](https://docs.soliditylang.org/en/v0.8.7/internals/optimizer.html#differences-between-optimized-and-non-optimized-code)
  * [Optimizer Parameter Runs](https://docs.soliditylang.org/en/v0.8.7/internals/optimizer.html#optimizer-parameter-runs)
  * [Opcode-Based Optimizer Module](https://docs.soliditylang.org/en/v0.8.7/internals/optimizer.html#opcode-based-optimizer-module)
  * [Yul-Based Optimizer Module](https://docs.soliditylang.org/en/v0.8.7/internals/optimizer.html#yul-based-optimizer-module)
* [Contract Metadata](https://docs.soliditylang.org/en/v0.8.7/metadata.html)
  * [Encoding of the Metadata Hash in the Bytecode](https://docs.soliditylang.org/en/v0.8.7/metadata.html#encoding-of-the-metadata-hash-in-the-bytecode)
  * [Usage for Automatic Interface Generation and NatSpec](https://docs.soliditylang.org/en/v0.8.7/metadata.html#usage-for-automatic-interface-generation-and-natspec)
  * [Usage for Source Code Verification](https://docs.soliditylang.org/en/v0.8.7/metadata.html#usage-for-source-code-verification)
* [Contract ABI Specification](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html)
  * [Basic Design](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#basic-design)
  * [Function Selector](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#function-selector)
  * [Argument Encoding](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#argument-encoding)
  * [Types](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#types)
  * [Design Criteria for the Encoding](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#design-criteria-for-the-encoding)
  * [Formal Specification of the Encoding](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#formal-specification-of-the-encoding)
  * [Function Selector and Argument Encoding](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#function-selector-and-argument-encoding)
  * [Examples](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#examples)
  * [Use of Dynamic Types](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#use-of-dynamic-types)
  * [Events](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#events)
  * [Errors](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#errors)
  * [JSON](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#json)
  * [Strict Encoding Mode](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#strict-encoding-mode)
  * [Non-standard Packed Mode](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#non-standard-packed-mode)
  * [Encoding of Indexed Event Parameters](https://docs.soliditylang.org/en/v0.8.7/abi-spec.html#encoding-of-indexed-event-parameters)

Additional Material

* [Solidity v0.5.0 Breaking Changes](https://docs.soliditylang.org/en/v0.8.7/050-breaking-changes.html)
  * [Semantic Only Changes](https://docs.soliditylang.org/en/v0.8.7/050-breaking-changes.html#semantic-only-changes)
  * [Semantic and Syntactic Changes](https://docs.soliditylang.org/en/v0.8.7/050-breaking-changes.html#semantic-and-syntactic-changes)
  * [Explicitness Requirements](https://docs.soliditylang.org/en/v0.8.7/050-breaking-changes.html#explicitness-requirements)
  * [Deprecated Elements](https://docs.soliditylang.org/en/v0.8.7/050-breaking-changes.html#deprecated-elements)
  * [Interoperability With Older Contracts](https://docs.soliditylang.org/en/v0.8.7/050-breaking-changes.html#interoperability-with-older-contracts)
  * [Example](https://docs.soliditylang.org/en/v0.8.7/050-breaking-changes.html#example)
* [Solidity v0.6.0 Breaking Changes](https://docs.soliditylang.org/en/v0.8.7/060-breaking-changes.html)
  * [Changes the Compiler Might not Warn About](https://docs.soliditylang.org/en/v0.8.7/060-breaking-changes.html#changes-the-compiler-might-not-warn-about)
  * [Explicitness Requirements](https://docs.soliditylang.org/en/v0.8.7/060-breaking-changes.html#explicitness-requirements)
  * [Semantic and Syntactic Changes](https://docs.soliditylang.org/en/v0.8.7/060-breaking-changes.html#semantic-and-syntactic-changes)
  * [New Features](https://docs.soliditylang.org/en/v0.8.7/060-breaking-changes.html#new-features)
  * [Interface Changes](https://docs.soliditylang.org/en/v0.8.7/060-breaking-changes.html#interface-changes)
  * [How to update your code](https://docs.soliditylang.org/en/v0.8.7/060-breaking-changes.html#how-to-update-your-code)
* [Solidity v0.7.0 Breaking Changes](https://docs.soliditylang.org/en/v0.8.7/070-breaking-changes.html)
  * [Silent Changes of the Semantics](https://docs.soliditylang.org/en/v0.8.7/070-breaking-changes.html#silent-changes-of-the-semantics)
  * [Changes to the Syntax](https://docs.soliditylang.org/en/v0.8.7/070-breaking-changes.html#changes-to-the-syntax)
  * [Removal of Unused or Unsafe Features](https://docs.soliditylang.org/en/v0.8.7/070-breaking-changes.html#removal-of-unused-or-unsafe-features)
  * [Interface Changes](https://docs.soliditylang.org/en/v0.8.7/070-breaking-changes.html#interface-changes)
  * [How to update your code](https://docs.soliditylang.org/en/v0.8.7/070-breaking-changes.html#how-to-update-your-code)
* [Solidity v0.8.0 Breaking Changes](https://docs.soliditylang.org/en/v0.8.7/080-breaking-changes.html)
  * [Silent Changes of the Semantics](https://docs.soliditylang.org/en/v0.8.7/080-breaking-changes.html#silent-changes-of-the-semantics)
  * [New Restrictions](https://docs.soliditylang.org/en/v0.8.7/080-breaking-changes.html#new-restrictions)
  * [Interface Changes](https://docs.soliditylang.org/en/v0.8.7/080-breaking-changes.html#interface-changes)
  * [How to update your code](https://docs.soliditylang.org/en/v0.8.7/080-breaking-changes.html#how-to-update-your-code)
* [NatSpec Format](https://docs.soliditylang.org/en/v0.8.7/natspec-format.html)
  * [Documentation Example](https://docs.soliditylang.org/en/v0.8.7/natspec-format.html#documentation-example)
  * [Tags](https://docs.soliditylang.org/en/v0.8.7/natspec-format.html#tags)
  * [Documentation Output](https://docs.soliditylang.org/en/v0.8.7/natspec-format.html#documentation-output)
* [Security Considerations](https://docs.soliditylang.org/en/v0.8.7/security-considerations.html)
  * [Pitfalls](https://docs.soliditylang.org/en/v0.8.7/security-considerations.html#pitfalls)
  * [Recommendations](https://docs.soliditylang.org/en/v0.8.7/security-considerations.html#recommendations)
* [SMTChecker and Formal Verification](https://docs.soliditylang.org/en/v0.8.7/smtchecker.html)
  * [Tutorial](https://docs.soliditylang.org/en/v0.8.7/smtchecker.html#tutorial)
  * [SMTChecker Options and Tuning](https://docs.soliditylang.org/en/v0.8.7/smtchecker.html#smtchecker-options-and-tuning)
  * [Abstraction and False Positives](https://docs.soliditylang.org/en/v0.8.7/smtchecker.html#abstraction-and-false-positives)
  * [Real World Assumptions](https://docs.soliditylang.org/en/v0.8.7/smtchecker.html#real-world-assumptions)
* [Resources](https://docs.soliditylang.org/en/v0.8.7/resources.html)
  * [General Resources](https://docs.soliditylang.org/en/v0.8.7/resources.html#general-resources)
  * [Integrated \(Ethereum\) Development Environments](https://docs.soliditylang.org/en/v0.8.7/resources.html#integrated-ethereum-development-environments)
  * [Editor Integrations](https://docs.soliditylang.org/en/v0.8.7/resources.html#editor-integrations)
  * [Solidity Tools](https://docs.soliditylang.org/en/v0.8.7/resources.html#solidity-tools)
  * [Third-Party Solidity Parsers and Grammars](https://docs.soliditylang.org/en/v0.8.7/resources.html#third-party-solidity-parsers-and-grammars)
* [Import Path Resolution](https://docs.soliditylang.org/en/v0.8.7/path-resolution.html)
  * [Virtual Filesystem](https://docs.soliditylang.org/en/v0.8.7/path-resolution.html#virtual-filesystem)
  * [Imports](https://docs.soliditylang.org/en/v0.8.7/path-resolution.html#imports)
  * [Base Path](https://docs.soliditylang.org/en/v0.8.7/path-resolution.html#base-path)
  * [Import Remapping](https://docs.soliditylang.org/en/v0.8.7/path-resolution.html#import-remapping)
  * [Using URLs in imports](https://docs.soliditylang.org/en/v0.8.7/path-resolution.html#using-urls-in-imports)
* [Yul](https://docs.soliditylang.org/en/v0.8.7/yul.html)
  * [Motivation and High-level Description](https://docs.soliditylang.org/en/v0.8.7/yul.html#motivation-and-high-level-description)
  * [Simple Example](https://docs.soliditylang.org/en/v0.8.7/yul.html#simple-example)
  * [Stand-Alone Usage](https://docs.soliditylang.org/en/v0.8.7/yul.html#stand-alone-usage)
  * [Informal Description of Yul](https://docs.soliditylang.org/en/v0.8.7/yul.html#informal-description-of-yul)
  * [Specification of Yul](https://docs.soliditylang.org/en/v0.8.7/yul.html#specification-of-yul)
  * [Specification of Yul Object](https://docs.soliditylang.org/en/v0.8.7/yul.html#specification-of-yul-object)
  * [Yul Optimizer](https://docs.soliditylang.org/en/v0.8.7/yul.html#yul-optimizer)
  * [Complete ERC20 Example](https://docs.soliditylang.org/en/v0.8.7/yul.html#complete-erc20-example)
* [Style Guide](https://docs.soliditylang.org/en/v0.8.7/style-guide.html)
  * [Introduction](https://docs.soliditylang.org/en/v0.8.7/style-guide.html#introduction)
  * [Code Layout](https://docs.soliditylang.org/en/v0.8.7/style-guide.html#code-layout)
  * [Order of Layout](https://docs.soliditylang.org/en/v0.8.7/style-guide.html#order-of-layout)
  * [Naming Conventions](https://docs.soliditylang.org/en/v0.8.7/style-guide.html#naming-conventions)
  * [NatSpec](https://docs.soliditylang.org/en/v0.8.7/style-guide.html#natspec)
* [Common Patterns](https://docs.soliditylang.org/en/v0.8.7/common-patterns.html)
  * [Withdrawal from Contracts](https://docs.soliditylang.org/en/v0.8.7/common-patterns.html#withdrawal-from-contracts)
  * [Restricting Access](https://docs.soliditylang.org/en/v0.8.7/common-patterns.html#restricting-access)
  * [State Machine](https://docs.soliditylang.org/en/v0.8.7/common-patterns.html#state-machine)
* [List of Known Bugs](https://docs.soliditylang.org/en/v0.8.7/bugs.html)
* [Contributing](https://docs.soliditylang.org/en/v0.8.7/contributing.html)
  * [Team Calls](https://docs.soliditylang.org/en/v0.8.7/contributing.html#team-calls)
  * [How to Report Issues](https://docs.soliditylang.org/en/v0.8.7/contributing.html#how-to-report-issues)
  * [Workflow for Pull Requests](https://docs.soliditylang.org/en/v0.8.7/contributing.html#workflow-for-pull-requests)
  * [Running the Compiler Tests](https://docs.soliditylang.org/en/v0.8.7/contributing.html#running-the-compiler-tests)
  * [Running the Fuzzer via AFL](https://docs.soliditylang.org/en/v0.8.7/contributing.html#running-the-fuzzer-via-afl)
  * [Whiskers](https://docs.soliditylang.org/en/v0.8.7/contributing.html#whiskers)
  * [Documentation Style Guide](https://docs.soliditylang.org/en/v0.8.7/contributing.html#documentation-style-guide)
  * [Solidity Language Design](https://docs.soliditylang.org/en/v0.8.7/contributing.html#solidity-language-design)
* [Solidity Brand Guide](https://docs.soliditylang.org/en/v0.8.7/brand-guide.html)
  * [The Solidity Brand](https://docs.soliditylang.org/en/v0.8.7/brand-guide.html#the-solidity-brand)
  * [Solidity Brand Name](https://docs.soliditylang.org/en/v0.8.7/brand-guide.html#solidity-brand-name)
  * [Solidity Logo License](https://docs.soliditylang.org/en/v0.8.7/brand-guide.html#solidity-logo-license)
  * [Solidity Logo Guidelines](https://docs.soliditylang.org/en/v0.8.7/brand-guide.html#solidity-logo-guidelines)
  * [Credits](https://docs.soliditylang.org/en/v0.8.7/brand-guide.html#credits)
* [Language Influences](https://docs.soliditylang.org/en/v0.8.7/language-influences.html)

