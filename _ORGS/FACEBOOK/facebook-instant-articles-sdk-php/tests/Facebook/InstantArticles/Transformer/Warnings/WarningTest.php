<?php
/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
namespace Facebook\InstantArticles\Transformer\Warnings;

use PHPUnit\Framework\TestCase;

class WarningTest extends TestCase
{
    public function testWarningElementSelector()
    {
        $document = new \DOMDocument();
        $node = $document->createElement('img');
        $expected = 'img';

        $warningInvalidSelector = new InvalidSelector('field a and b', null, $node, null);
        $warningoRootInstantArticleFound = new NoRootInstantArticleFoundWarning($node, $node);
        $warningUnrecognizedElement = new UnrecognizedElement(null, $node);
        $warningValidator = new ValidatorWarning($node, $node);

        $this->assertEquals($expected, $warningInvalidSelector->getSelector());
        $this->assertEquals($expected, $warningoRootInstantArticleFound->getSelector());
        $this->assertEquals($expected, $warningUnrecognizedElement->getSelector());
        $this->assertEquals($expected, $warningValidator->getSelector());
    }

    public function testWarningClassSelector()
    {
        $document = new \DOMDocument();
        $node = $document->createElement('img');
        $node->setAttribute('class', 'someClass');
        $expected = 'img.someClass';

        $warningInvalidSelector = new InvalidSelector('field a and b', null, $node, null);
        $warningoRootInstantArticleFound = new NoRootInstantArticleFoundWarning($node, $node);
        $warningUnrecognizedElement = new UnrecognizedElement(null, $node);
        $warningValidator = new ValidatorWarning($node, $node);

        $this->assertEquals($expected, $warningInvalidSelector->getSelector());
        $this->assertEquals($expected, $warningoRootInstantArticleFound->getSelector());
        $this->assertEquals($expected, $warningUnrecognizedElement->getSelector());
        $this->assertEquals($expected, $warningValidator->getSelector());
    }

    public function testWarningIDSelector()
    {
        $document = new \DOMDocument();
        $node = $document->createElement('img');
        $node->setAttribute('id', 'myID');
        $expected = '#myID';

        $warningInvalidSelector = new InvalidSelector('field a and b', null, $node, null);
        $warningoRootInstantArticleFound = new NoRootInstantArticleFoundWarning($node, $node);
        $warningUnrecognizedElement = new UnrecognizedElement(null, $node);
        $warningValidator = new ValidatorWarning($node, $node);

        $this->assertEquals($expected, $warningInvalidSelector->getSelector());
        $this->assertEquals($expected, $warningoRootInstantArticleFound->getSelector());
        $this->assertEquals($expected, $warningUnrecognizedElement->getSelector());
        $this->assertEquals($expected, $warningValidator->getSelector());
    }
}
