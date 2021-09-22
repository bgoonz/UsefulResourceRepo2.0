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

abstract class Warning
{
    /**
     * @var DOMNode
     */
    protected $node;

    /**
     * @var string
     */
    protected $selector;

    /**
     * @return string
     */
    abstract public function __toString();

    /**
     * @param DOMNode $node
     * @param string $selector
     */
    public function __construct($node)
    {
        $this->node = $node;
        $this->selector = $this->getCSSSelector();
    }


    /**
     * @return string
     */
    public function getCSSSelector()
    {
        if ($this->node) {
            if (Type::is($this->node, 'DOMElement')) {
                $id = $this->node->getAttribute('id');
                if ($id) {
                    return "#$id";
                }
                $class = $this->node->getAttribute('class');
                if ($class) {
                    return $this->node->nodeName . "." . str_replace(" ", ".", $class);
                }
            }
            if (!Type::is($this->node, 'DOMText')) {
                return $this->node->nodeName;
            }
        }
        return '';
    }

    /**
     * @return DOMNode
     */
    public function getNode()
    {
        return $this->node;
    }

    /**
     * @return string
     */
    public function getSelector()
    {
        return $this->selector;
    }
}
