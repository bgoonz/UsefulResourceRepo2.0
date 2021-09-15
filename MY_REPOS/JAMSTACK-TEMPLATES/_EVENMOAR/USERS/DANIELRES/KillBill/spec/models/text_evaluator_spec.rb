require_relative '../spec_helper'
require 'text_evaluator'



describe TextEvaluator do

  it "supports creating a new TextEvaluator instance" do
    e = TextEvaluator.new
  end

  let(:e) { TextEvaluator.new }

  context "given nothing" do
    it "returns an empty string" do
      expect( e.evaluate    ).to eq ""
      expect( e.evaluate nil).to eq ""
    end
  end

  context "given a string" do
    context "the string is empty" do
      it "returns an empty string" do
        expect( e.evaluate nil ).to eq ""
      end
    end
    context "the string is static" do
      it "returns the string" do
        expect( e.evaluate 'some text' ).to eq 'some text'
      end
    end
    context "the string contains interpolation" do
      it "returns the interpolated string" do
        expect( e.evaluate 'I have #{ 7+3 } rubies' ).to eq 'I have 10 rubies'
      end
    end
    context "given a context" do
      it "evaluates the string using values from the context" do
        context = Object.new
        context.stub number: 10
        expect( e.evaluate 'I have #{ context.number } rubies', context: context ).to eq 'I have 10 rubies'
      end
    end
    context "given options" do
      it "passes the options as values for the interpolation" do
        context = Object.new
        context.stub number: 10
        expect( e.evaluate 'I have #{ context.number } #{ stones }', context: context, stones: 'diamonds' ).to eq 'I have 10 diamonds'
      end
    end
  end


  context "given an array" do

    context "the array is empty" do
      it "returns an empty string" do
        expect( e.evaluate [] ).to eq ""
      end
    end

    context "the array contains strings and numbers" do
      it "returns a string with elements separated by spaces" do
        expect( e.evaluate [ 'I have', 10, 'rubies'] ).to eq "I have 10 rubies"
      end
    end

    context "a separator is given" do
      it "returns a string with elements separated by the separator" do
        expect( e.evaluate [ 'I have', 10, 'rubies'], separator: ', ' ).to eq "I have, 10, rubies"
      end
    end

    context "the array contains strings with interpolation and context" do
      it "returns a string with properly interpolated elements " do
        context = Object.new
        context.stub number: 10
        expect( e.evaluate [ 'I have', '#{  context.number }', 'rubies'], context: context ).to eq "I have 10 rubies"
      end
    end

  end


end