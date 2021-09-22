<?php
/**
 * Copyright (c) 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */
namespace Facebook\InstantArticles\Transformer\Warnings;

use Facebook\InstantArticles\Elements\Element;
use Facebook\InstantArticles\Validators\Type;

class NoRootInstantArticleFoundWarning extends Warning
{
    /**
     * @var Element
     */
    private $element;

    /**
     * @var array the configuration content
     */
    private $configuration;

    /**
     * @param Element $element
     * @param DOMNode $node
     */
    public function __construct($element, $node = null)
    {
        parent::__construct($node);
        $this->element = $element;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->formatWarningMessage();
    }

    /**
     * @return Element
     */
    public function getElement()
    {
        return $this->element;
    }


    private function formatWarningMessage()
    {
        $node_string = $this->node->ownerDocument->saveHtml($this->node);
        return "No instant article was informed in the context for Transformer. This element will be lost during transformation: " . $node_string;
    }
}
