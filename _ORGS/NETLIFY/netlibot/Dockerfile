FROM golang:1.10.2
WORKDIR /go/src/github.com/netlify/netlibot
COPY . /go/src/github.com/netlify/netlibot/
ENV CGO_ENABLED 0
RUN go get -u github.com/Masterminds/glide && glide install && go build

FROM alpine:3.7
RUN apk add --no-cache ca-certificates
COPY --from=0 /go/src/github.com/netlify/netlibot/netlibot /netlibot/netlibot
WORKDIR /netlibot
CMD ["./netlibot"]
