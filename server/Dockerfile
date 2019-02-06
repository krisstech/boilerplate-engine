FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app

# Copy everything and build
COPY . ./

RUN dotnet restore "./BoilerplateEngine.API/BoilerplateEngine.API.csproj"
RUN dotnet publish "./BoilerplateEngine.API/BoilerplateEngine.API.csproj" -c Release -o out

# Hmm, my specific app eeds a lot of things to be installed on the server
# FROM microsoft/dotnet:aspnetcore-runtime
FROM microsoft/dotnet:sdk

# set up node
ENV NODE_VERSION 10.14.1
ENV YARN_VERSION 1.12.3
ENV NODE_DOWNLOAD_SHA 2cc1a9b118e5d660cd6611c808f0cd80821c79ea5990c221b78124770f4dc38e
ENV NODE_DOWNLOAD_URL https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz

RUN wget "$NODE_DOWNLOAD_URL" -O nodejs.tar.gz \
    && echo "$NODE_DOWNLOAD_SHA  nodejs.tar.gz" | sha256sum -c - \
    && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
    && rm nodejs.tar.gz \
    && npm i -g yarn@$YARN_VERSION \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs

WORKDIR /app
COPY --from=build-env /app/BoilerplateEngine.API/out .
ENTRYPOINT ["dotnet", "BoilerplateEngine.API.dll"]
