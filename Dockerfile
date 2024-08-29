FROM ubuntu
RUN cd / && mkdir dineirus && chmod 777 -R dineirus/ 

COPY ./ /dineirus

VOLUME /dineirus/

EXPOSE 3000

ENV NODE_ENV="prod"

WORKDIR /dineirus/

RUN apt update 

RUN apt upgrade -y

RUN apt install curl -y

RUN apt install unzip -y

RUN curl -fsSL https://bun.sh/install | bash

RUN curl -fsSL https://bun.sh/install | bash && \
  ln -s $HOME/.bun/bin/bun /usr/local/bin/bun

CMD ["bun", "dev"]