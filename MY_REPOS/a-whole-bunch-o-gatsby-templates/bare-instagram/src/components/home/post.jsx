import * as React from 'react'
import useNames from '../../hooks/use-names'
import { getElByPropVal } from '../../utils/get-element'
import { timestampToDate } from '../../utils/timestamp-to-date'
import External from '../../icons/external'
import Video from '../../icons/video'
import Sidecar from '../../icons/sidecar'

const Image = ({ picture, dimensions, isMinimal, isGapless }) => (
  <>
    {picture ? (
      <img
        alt=""
        src={picture}
        width={dimensions.width}
        height={dimensions.height}
        loading="lazy"
        className={isMinimal ? `rounded-lg shadow-lg` : `rounded-t-lg`}
        style={{
          borderRadius: isGapless ? 0 : undefined,
          boxShadow: isGapless ? 'none' : undefined,
        }}
      />
    ) : (
      <div className="p-12 bg-gradient-to-tl from-blue-600 to-blue-800 text-center rounded-lg shadow-lg text-xl font-medium">
        No picture available :(
      </div>
    )}
  </>
)

const Post = ({
  shortcode,
  description,
  timestamp,
  picture,
  owner,
  dimensions,
  isMinimal,
  isGapless,
  isVideo,
  isSidecar,
}) => {
  const [names] = useNames()
  const ownerInformation = getElByPropVal(names, 'id', owner)
  const date = timestampToDate(timestamp)

  if (isMinimal) {
    return (
      <div>
        <Image
          picture={picture}
          dimensions={dimensions}
          isMinimal={isMinimal}
          isGapless={isGapless}
        />
      </div>
    )
  }

  return (
    <div
      className="shadow-lg rounded-b-lg"
      style={{
        display: `inline-table`,
        boxShadow: isGapless ? 'none' : undefined,
      }}
    >
      <Image
        picture={picture}
        dimensions={dimensions}
        isMinimal={isMinimal}
        isGapless={isGapless}
      />
      <div
        className="flex flex-row bg-white dark:bg-gray-800 px-4 py-2 rounded-b-lg text-gray-500 dark:text-gray-400 justify-between"
        style={{
          borderBottomLeftRadius: description ? 0 : undefined,
          borderBottomRightRadius: description ? 0 : undefined,
        }}
      >
        <a
          className="flex flex-row flex-nowrap items-center space-x-2"
          aria-label={`View this post on ${ownerInformation.username} profile`}
          href={`https://www.instagram.com/p/${shortcode}`}
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {ownerInformation.username}
          </span>
          <External />
          {isVideo && <Video />}
          {isSidecar && <Sidecar />}
        </a>
        <div className="tracking-wide">{date}</div>
      </div>
      {description && (
        <div
          className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800"
          style={{
            wordBreak: `break-all`,
            whiteSpace: `pre-wrap`,
            borderBottomLeftRadius: description
              ? isGapless
                ? 0
                : '0.5rem'
              : undefined,
            borderBottomRightRadius: description
              ? isGapless
                ? 0
                : '0.5rem'
              : undefined,
          }}
        >
          {description}
        </div>
      )}
    </div>
  )
}

export default Post
