const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const express = require('express');

module.exports = function(app) {
  // 루트 디렉토리에서 정적 파일 제공
  app.use('/static', express.static(path.join(__dirname, '../')));

  // output.mp3 프록시 설정
  // app.use(
  //   '/output.mp3',
  //   createProxyMiddleware({
  //     target: 'http://13.124.149.28:3000/static',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/output.mp3': '/output.mp3',
  //     },
  //   })
  // );
  app.use(
    '/resources/output.mp3',
    createProxyMiddleware({
      target: 'http://localhost:3000/static',
      changeOrigin: true,
      pathRewrite: {
        '^/resources/output.mp3': '/resources/output.mp3',
      },
    })
  );

  // captured_audio.wav 프록시 설정
  app.use(
    '/captured_audio.wav',
    createProxyMiddleware({
      target: 'http://13.124.149.28:3000/static',
      changeOrigin: true,
      pathRewrite: {
        '^/captured_audio.wav': '/captured_audio.wav',
      },
    })
  );

  // captured_audio_*.wav 프록시 설정
  // app.use(
  //   '/captured_audio_:aiinterviewNo.wav',
  //   createProxyMiddleware({
  //     target: 'http://localhost:3000/static',
  //     changeOrigin: true,
  //     pathRewrite: (path, req) => {
  //       // path에서 aiinterviewNo를 추출하여 경로 재작성
  //       const aiinterviewNo = path.match(/captured_audio_(\d+).wav/)[1];
  //       return `/captured_audio_${aiinterviewNo}.wav`;
  //     },
  //   })
  // );
};
