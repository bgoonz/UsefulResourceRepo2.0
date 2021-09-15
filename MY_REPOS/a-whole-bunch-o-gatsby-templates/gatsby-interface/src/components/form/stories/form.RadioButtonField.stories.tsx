/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"

import { storiesOf } from "@storybook/react"
import { text, radios } from "@storybook/addon-knobs"

import { StoryUtils } from "../../../utils/storybook"
import README from "../README_RADIO_FIELD.md"
import {
  RadioButtonField,
  RadioButtonFieldLabel,
  RadioButtonFieldOptions,
  RadioButtonFieldOptionWrapper,
  RadioButtonFieldOption,
  RadioButtonFieldOptionLabel,
  RadioButtonFieldHint,
  RadioButtonFieldError,
  RadioButtonFieldOptionFrame,
} from "../components/RadioButtonField"
import { RadioButtonFieldBlock } from "../components/RadioButtonFieldBlock"
import { FormFieldLabelSize } from "../components/FormField.helpers"
import { enumToOptions } from "../../../utils/helpers"
import { Wrapper } from "./stories.utils"

const LABEL_SIZES: FormFieldLabelSize[] = [`L`, `M`, `S`]
const LABEL_SIZE_OPTIONS = LABEL_SIZES.reduce(enumToOptions, {})

storiesOf(`form/RadioButtonField`, module)
  .addParameters({
    options: {
      showPanel: true,
    },
    readme: {
      sidebar: README,
    },
  })
  .add(`standard`, () => {
    const hint = text(`Hint`, ``)
    const error = text(`Error`, ``)
    const categories = [`article`, `essay`, `memories`].map(name => {
      return {
        label: name,
        value: name.toLowerCase().replace(/\s/g, `-`),
      }
    })

    const labeSize: FormFieldLabelSize = radios(
      `Label size`,
      LABEL_SIZE_OPTIONS,
      `M`
    )
    const optionLabelSize: FormFieldLabelSize = radios(
      `Option label size`,
      LABEL_SIZE_OPTIONS,
      `L`
    )

    const [fieldValue, setFieldValue] = React.useState<string>(``)

    return (
      <StoryUtils.Container>
        <Wrapper>
          <RadioButtonFieldBlock
            id="example-1a"
            label="Category"
            name="category"
            value={fieldValue}
            options={categories}
            onChange={e => setFieldValue(e.currentTarget.value)}
            error={error}
            hint={hint}
          />

          <RadioButtonField
            id="example-1b"
            hasError={!!error}
            hasHint={!!hint}
            layout="horizontal"
          >
            <RadioButtonFieldLabel size={labeSize}>
              Category
            </RadioButtonFieldLabel>
            <RadioButtonFieldOptions>
              {categories.map(({ label, value }) => (
                <RadioButtonFieldOptionWrapper key={value}>
                  <RadioButtonFieldOption value={value} name="option1b" />
                  <RadioButtonFieldOptionLabel
                    size={optionLabelSize}
                    optionValue={value}
                  >
                    {label}
                  </RadioButtonFieldOptionLabel>
                </RadioButtonFieldOptionWrapper>
              ))}
            </RadioButtonFieldOptions>
            <RadioButtonFieldHint>{hint}</RadioButtonFieldHint>
            <RadioButtonFieldError>{error}</RadioButtonFieldError>
          </RadioButtonField>
        </Wrapper>
      </StoryUtils.Container>
    )
  })

  .add(`framed`, () => {
    const hint = text(`Hint`, ``)
    const error = text(`Error`, ``)
    const categories = [`article`, `essay`, `memories`].map(name => {
      return {
        label: name,
        value: name.toLowerCase().replace(/\s/g, `-`),
      }
    })
    const labelSize: FormFieldLabelSize = radios(
      `Label size`,
      LABEL_SIZE_OPTIONS,
      `M`
    )
    const optionLabelSize: FormFieldLabelSize = radios(
      `Option label size`,
      LABEL_SIZE_OPTIONS,
      `L`
    )

    return (
      <StoryUtils.Container>
        <Wrapper>
          <RadioButtonField
            id="example-2"
            hasError={!!error}
            hasHint={!!hint}
            variant="framed"
          >
            <RadioButtonFieldLabel size={labelSize}>
              Category
            </RadioButtonFieldLabel>
            <RadioButtonFieldOptions>
              {categories.map(({ label, value }) => (
                <RadioButtonFieldOptionFrame key={value}>
                  <RadioButtonFieldOption value={value} name="categories" />
                  <RadioButtonFieldOptionLabel
                    size={optionLabelSize}
                    optionValue={value}
                  >
                    {label}
                  </RadioButtonFieldOptionLabel>
                </RadioButtonFieldOptionFrame>
              ))}
            </RadioButtonFieldOptions>
            <RadioButtonFieldHint>{hint}</RadioButtonFieldHint>
            <RadioButtonFieldError>{error}</RadioButtonFieldError>
          </RadioButtonField>
        </Wrapper>
      </StoryUtils.Container>
    )
  })

  .add(`Hint and Error placement`, () => {
    const hint = text(`Hint`, `This is a hint`)
    const error = text(`Error`, `And this is an error message`)
    const options = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`].map(
      name => {
        return {
          label: `option ${name}`,
          value: name.toLowerCase().replace(/\s/g, `-`),
        }
      }
    )
    const labelSize: FormFieldLabelSize = radios(
      `Label size`,
      LABEL_SIZE_OPTIONS,
      `M`
    )
    const optionLabelSize: FormFieldLabelSize = radios(
      `Option label size`,
      LABEL_SIZE_OPTIONS,
      `L`
    )

    return (
      <StoryUtils.Container>
        <Wrapper>
          <RadioButtonField id="example-3a" hasError={!!error} hasHint={!!hint}>
            <RadioButtonFieldLabel size={labelSize}>
              Category
            </RadioButtonFieldLabel>
            <RadioButtonFieldOptions>
              {options
                .filter((_, idx) => idx < 3)
                .map(({ label, value }) => (
                  <RadioButtonFieldOptionWrapper key={value}>
                    <RadioButtonFieldOption value={value} name="options3a" />
                    <RadioButtonFieldOptionLabel
                      size={optionLabelSize}
                      optionValue={value}
                    >
                      {label}
                    </RadioButtonFieldOptionLabel>
                  </RadioButtonFieldOptionWrapper>
                ))}
            </RadioButtonFieldOptions>
            <RadioButtonFieldHint>
              {hint || `This one is also built with 'InputFieldBlock'`}
            </RadioButtonFieldHint>
            <RadioButtonFieldError>{error}</RadioButtonFieldError>
          </RadioButtonField>

          <RadioButtonField id="example-3b" hasError={!!error} hasHint={!!hint}>
            <RadioButtonFieldLabel size={labelSize}>
              Category
            </RadioButtonFieldLabel>
            <RadioButtonFieldHint>{hint}</RadioButtonFieldHint>
            <RadioButtonFieldError>{error}</RadioButtonFieldError>
            <RadioButtonFieldOptions>
              {options.map(({ label, value }) => (
                <RadioButtonFieldOptionWrapper key={value}>
                  <RadioButtonFieldOption value={value} name="options3b" />
                  <RadioButtonFieldOptionLabel
                    size={optionLabelSize}
                    optionValue={value}
                  >
                    {label}
                  </RadioButtonFieldOptionLabel>
                </RadioButtonFieldOptionWrapper>
              ))}
            </RadioButtonFieldOptions>
          </RadioButtonField>
        </Wrapper>
      </StoryUtils.Container>
    )
  })
