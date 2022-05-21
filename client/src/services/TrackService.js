const baseUrl = "http://localhost:5000/";

export const TrackService = {
  async getTracks() {
    return await fetch(baseUrl).then((res) => res.json());
  },

  addTrack(formData) {
    return fetch(`${baseUrl}upload`, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  },

  updateTrack(trackTitle, updatedTrack) {
    return fetch(baseUrl + trackTitle, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTrack),
    }).then((res) => res.json);
  },

  deleteTrack(trackTitle) {
    return fetch(baseUrl + trackTitle, {
      method: "DELETE",
    });
  },
};
