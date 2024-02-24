use std::{error::Error, io::{Read, Write}};

use brotlic::{BlockSize, BrotliEncoderOptions, CompressorWriter, DecompressorReader, Quality, WindowSize};

pub fn compress_data(data: String) -> Result<Vec<u8>, Box<dyn Error>> {
    let encoder = BrotliEncoderOptions::new()
        .quality(Quality::best())
        .window_size(WindowSize::best())
        .block_size(BlockSize::best())
        .build()?;

    let inner = Vec::new();
    let mut writer = CompressorWriter::with_encoder(encoder, inner);

    writer.write_all(data.as_bytes())?;
    writer.flush()?;

    Ok(writer.into_inner()?.to_vec())
}

pub fn decompress_data(data: Vec<u8>) -> Result<String, Box<dyn Error>> {
    let mut decompressor = DecompressorReader::new(&data[..]);
    let mut decompressed = String::new();

    decompressor.read_to_string(&mut decompressed)?;

    Ok(decompressed)
}